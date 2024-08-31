from rest_framework.routers import DefaultRouter
from rest_framework.urls import path
from mainapp.views import CustomUserViewSet, EventViewSet, AssignmentViewSet, MessageViewSet, QuestionViewSet, \
    SentQuestionAnswerViewSet, GroupViewSet ,current_user_view

urlpatterns = [
    path('current_user/', current_user_view.ProtectedView.as_view(), name='current_user')
]

router = DefaultRouter()

router.register("user", CustomUserViewSet)
router.register("event", EventViewSet)
router.register("assignment", AssignmentViewSet)
router.register("message", MessageViewSet)
router.register("question", QuestionViewSet)
router.register("sent_question_assignment", SentQuestionAnswerViewSet)
router.register("group", GroupViewSet)

urlpatterns += router.urls
