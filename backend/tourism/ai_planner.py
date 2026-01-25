from .models import Attraction

def generate_itinerary(days, budget_level, interests):
    """
    Generates a simple itinerary based on rules.
    budget_level: 1 (Low), 2 (Medium), 3 (High)
    interests: list of strings ['natural', 'historical', 'cultural']
    """
    all_attractions = Attraction.objects.all()
    
    # Simple Mock "AI" Logic
    # 1. Filter by Interest
    relevant_attractions = [
        a for a in all_attractions 
        if a.attraction_type in interests or not interests
    ]
    
    # 2. Add some filler if not enough specific interests
    if len(relevant_attractions) < days:
        other_attractions = [a for a in all_attractions if a not in relevant_attractions]
        relevant_attractions.extend(other_attractions)
    
    # 3. Distribute over days
    itinerary = []
    items_per_day = 2 # Basic rule
    
    current_idx = 0
    for day in range(1, days + 1):
        day_plan = {
            "day": day,
            "activities": []
        }
        
        # Add 1-2 activities per day
        for _ in range(items_per_day):
            if current_idx < len(relevant_attractions):
                attr = relevant_attractions[current_idx]
                day_plan["activities"].append({
                    "name": attr.name,
                    "time": "Morning" if _ == 0 else "Afternoon",
                    "description": attr.description,
                    "image": attr.image.url if attr.image else None
                })
                current_idx += 1
        
        itinerary.append(day_plan)
        
    return itinerary
