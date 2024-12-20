interface TestInputProps {
  label: string;
  id: string;
  name?: string;
  placeholder?: string;
}

function TextInput(props: TestInputProps) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input
        {...props}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default TextInput;
