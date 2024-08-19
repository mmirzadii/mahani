function SubmitButton(props: any) {
  return (
    <button
      {...props}
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {props.children}
    </button>
  );
}

export default SubmitButton;
