from django.test import TestCase
from .models import Attraction, SiteConfiguration

class SiteConfigurationTests(TestCase):
    """Test the SiteConfiguration singleton model"""
    
    def test_site_configuration_singleton_pattern(self):
        """Test that SiteConfiguration enforces singleton with pk=1"""
        config1 = SiteConfiguration.objects.create(gemini_api_key="TEST_KEY_123")
        self.assertEqual(config1.pk, 1)
        self.assertEqual(config1.gemini_api_key, "TEST_KEY_123")
        
        # Update the same config (not create new)
        config1.gemini_api_key = "NEW_KEY_456"
        config1.save()
        
        # Only one object should exist
        self.assertEqual(SiteConfiguration.objects.count(), 1)
        
        # Verify the update worked
        config_reloaded = SiteConfiguration.objects.get(pk=1)
        self.assertEqual(config_reloaded.gemini_api_key, "NEW_KEY_456")
        
    def test_site_configuration_load_method(self):
        """Test the .load() classmethod creates and retrieves config"""
        config = SiteConfiguration.load()
        self.assertIsNotNone(config)
        self.assertEqual(config.pk, 1)
        
        # Update and reload
        config.gemini_api_key = "UPDATED_KEY"
        config.save()
        
        reloaded = SiteConfiguration.load()
        self.assertEqual(reloaded.gemini_api_key, "UPDATED_KEY")
        
    def test_site_configuration_blank_key(self):
        """Test that gemini_api_key can be blank"""
        config = SiteConfiguration.objects.create()
        self.assertIsNone(config.gemini_api_key)
        
    def test_site_configuration_string_representation(self):
        """Test __str__ method"""
        config = SiteConfiguration.load()
        self.assertEqual(str(config), "Site Configuration")


class AttractionModelTests(TestCase):
    """Test Attraction model creation and validation"""
    
    def test_create_attraction(self):
        """Test creating a basic attraction"""
        attraction = Attraction.objects.create(
            name="White Desert",
            description="A surreal landscape of chalk formations",
            attraction_type="natural",
            visit_duration_minutes=180,
            opening_time="08:00:00",
            closing_time="17:00:00",
            ticket_price=50.00,
            latitude=27.0524,
            longitude=27.9679,
            address="Farafra Oasis, New Valley Governorate"
        )
        
        self.assertEqual(attraction.name, "White Desert")
        self.assertEqual(attraction.attraction_type, "natural")
        self.assertEqual(str(attraction), "White Desert")
        
    def test_attraction_type_choices(self):
        """Test that attraction type accepts valid choices"""
        valid_types = ['natural', 'historical', 'cultural']
        
        for attraction_type in valid_types:
            attraction = Attraction.objects.create(
                name=f"Test {attraction_type}",
                description="Test description",
                attraction_type=attraction_type,
                visit_duration_minutes=60,
                opening_time="09:00:00",
                closing_time="18:00:00",
                ticket_price=0.00,
                latitude=25.0,
                longitude=30.0,
                address="Test Address"
            )
            self.assertEqual(attraction.attraction_type, attraction_type)
            
    def test_attraction_default_price(self):
        """Test that ticket_price defaults to 0.00"""
        attraction = Attraction.objects.create(
            name="Free Site",
            description="Free to visit",
            attraction_type="cultural",
            visit_duration_minutes=30,
            opening_time="00:00:00",
            closing_time="23:59:59",
            latitude=26.0,
            longitude=29.0,
            address="Free Site Address"
        )
        self.assertEqual(attraction.ticket_price, 0.00)


# Simple integration test without mocking
class BasicIntegrationTests(TestCase):
    """Basic integration tests"""
    
    def test_database_connection(self):
        """Test that we can create and retrieve objects"""
        # Create config
        config = SiteConfiguration.load()
        config.gemini_api_key = "INTEGRATION_TEST_KEY"
        config.save()
        
        # Create attraction
        Attraction.objects.create(
            name="Test Attraction",
            description="Integration test",
            attraction_type="historical",
            visit_duration_minutes=120,
            opening_time="10:00:00",
            closing_time="16:00:00",
            ticket_price=25.00,
            latitude=25.5,
            longitude=30.5,
            address="Integration Test Address"
        )
        
        # Verify
        self.assertEqual(SiteConfiguration.objects.count(), 1)
        self.assertEqual(Attraction.objects.count(), 1)
        
        # Retrieve
        retrieved_config = SiteConfiguration.load()
        self.assertEqual(retrieved_config.gemini_api_key, "INTEGRATION_TEST_KEY")
        
        retrieved_attraction = Attraction.objects.first()
        self.assertEqual(retrieved_attraction.name, "Test Attraction")
