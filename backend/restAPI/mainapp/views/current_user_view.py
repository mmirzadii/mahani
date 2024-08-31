from rest_framework import permissions, views, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from mainapp.models import CustomUser
from mainapp.serializers import CustomUserSerializer


class ProtectedView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]  # Ensure the user is authenticated
    authentication_classes = [JWTAuthentication]  # Use JWT authentication

    def get(self, request):
        try:

            user = request.user
            student = user.student  # or use user.student_profile if you used related_name
            serializer = CustomUserSerializer(student)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except CustomUser.DoesNotExist:
            return Response({"error": "Student profile not found."}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request):
        try:
            user = request.user
            serializer = CustomUserSerializer(user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except CustomUser.DoesNotExist:
            return Response({"error": "Student profile not found."}, status=status.HTTP_404_NOT_FOUND)
        # except:
        #     return Response({"error":"Something went wrong."},status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            user = request.user

            user.delete()
            return Response({"message": "Student profile deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

        except CustomUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except CustomUser.DoesNotExist:
            return Response({"error": "Student profile not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
