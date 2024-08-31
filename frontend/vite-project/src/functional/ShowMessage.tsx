import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);

const showAlert = (
  status: 'success' | 'error' | null,
  message = '',
  callback = () => {},
) => {
  if (status == null) {
    alert('is null');
  }
  switch (status) {
    case 'success':
      MySwal.fire({
        title: <strong>عملیات موفق</strong>,
        html: <p>{message}</p>,
        icon: 'success',
      }).then(callback);
      return;
    case 'error':
      MySwal.fire({
        title: <strong>خطا</strong>,
        html: <p>{message}</p>,
        icon: 'error',
      }).then(callback);
  }
};

export default showAlert;
