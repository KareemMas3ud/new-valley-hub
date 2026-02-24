from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
import logging

logger = logging.getLogger(__name__)


# ─────────────────────────────────────────────────────────────────────────────
#  REGISTER  —  POST /api/auth/register/
# ─────────────────────────────────────────────────────────────────────────────
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email    = request.data.get('email', '').strip().lower()
        password = request.data.get('password', '')
        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=400)
        if User.objects.filter(email=email).exists():
            return Response({'error': 'An account with this email already exists.'}, status=400)
        try:
            user    = User.objects.create_user(username=email, email=email, password=password)
            refresh = RefreshToken.for_user(user)
            return Response({
                'access':  str(refresh.access_token),
                'refresh': str(refresh),
                'email':   user.email,
                'user_id': user.id,
            }, status=201)
        except Exception as e:
            logger.error(f'[RegisterView] {e}', exc_info=True)
            return Response({'error': 'Registration failed.'}, status=500)


# ─────────────────────────────────────────────────────────────────────────────
#  TRIPS  —  GET / POST /api/auth/save-trip/
#            DELETE /api/auth/save-trip/<pk>/
# ─────────────────────────────────────────────────────────────────────────────
class SaveTripView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from .models import UserSavedTrip
        trips = UserSavedTrip.objects.filter(user=request.user)
        data  = [{
            'id':             t.id,
            'transport_mode': t.transport_mode,
            'total_co2':      float(t.total_co2),
            'route_data':     t.route_data,
            'created_at':     t.created_at.isoformat(),
        } for t in trips]
        logger.info(f'[SaveTripView.get] {request.user} → {len(data)} trips')
        return Response(data)

    def post(self, request):
        from .models import UserSavedTrip
        logger.info(f'[SaveTripView.post] user={request.user}')
        transport_mode = request.data.get('transport_mode', 'unknown')
        total_co2      = float(request.data.get('total_co2', 0) or 0)
        route_data     = request.data.get('route_data', [])
        try:
            trip = UserSavedTrip.objects.create(
                user=request.user,
                transport_mode=str(transport_mode)[:20],
                total_co2=total_co2,
                route_data=route_data if isinstance(route_data, list) else [],
            )
            return Response({'message': 'Trip saved! 🌿', 'trip_id': trip.id}, status=201)
        except Exception as e:
            logger.error(f'[SaveTripView.post] {e}', exc_info=True)
            return Response({'error': str(e), 'hint': 'Run python manage.py migrate'}, status=500)


class DeleteTripView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        from .models import UserSavedTrip
        try:
            trip = UserSavedTrip.objects.get(pk=pk, user=request.user)
            trip.delete()
            return Response({'message': 'Trip deleted.'})
        except UserSavedTrip.DoesNotExist:
            return Response({'error': 'Trip not found or not yours.'}, status=404)
        except Exception as e:
            logger.error(f'[DeleteTripView] {e}', exc_info=True)
            return Response({'error': str(e)}, status=500)


# ─────────────────────────────────────────────────────────────────────────────
#  SOUVENIRS  —  GET / POST /api/auth/souvenirs/
#               DELETE /api/auth/souvenirs/<pk>/
# ─────────────────────────────────────────────────────────────────────────────
class SouvenirView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from .models import UserSavedSouvenir
        souvenirs = UserSavedSouvenir.objects.filter(user=request.user)
        data = [{
            'id':         s.id,
            'image_data': s.image_data,
            'caption':    s.caption,
            'created_at': s.created_at.isoformat(),
        } for s in souvenirs]
        logger.info(f'[SouvenirView.get] {request.user} → {len(data)} souvenirs')
        return Response(data)

    def post(self, request):
        from .models import UserSavedSouvenir
        image_data = request.data.get('image_data', '')
        caption    = request.data.get('caption', '')[:120]
        if not image_data:
            return Response({'error': 'image_data is required.'}, status=400)
        try:
            souvenir = UserSavedSouvenir.objects.create(
                user=request.user,
                image_data=image_data,
                caption=caption,
            )
            return Response({'message': 'Souvenir saved! 🏺', 'souvenir_id': souvenir.id}, status=201)
        except Exception as e:
            logger.error(f'[SouvenirView.post] {e}', exc_info=True)
            return Response({'error': str(e), 'hint': 'Run python manage.py migrate'}, status=500)


class DeleteSouvenirView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        from .models import UserSavedSouvenir
        try:
            s = UserSavedSouvenir.objects.get(pk=pk, user=request.user)
            s.delete()
            return Response({'message': 'Souvenir deleted.'})
        except UserSavedSouvenir.DoesNotExist:
            return Response({'error': 'Souvenir not found or not yours.'}, status=404)
        except Exception as e:
            logger.error(f'[DeleteSouvenirView] {e}', exc_info=True)
            return Response({'error': str(e)}, status=500)
