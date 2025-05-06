import { ClipLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="spinner fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <ClipLoader color="#000000" size={50} />
    </div>
  );
}

export default Loading;