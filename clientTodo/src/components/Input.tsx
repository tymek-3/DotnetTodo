type InputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
  placeholder: string;
};

const Input = (props: InputProps) => {
  return (
    <input
      type={props.type || "text"}
      placeholder={props.placeholder}
      className="border border-black text-2xl w-96"
      onChange={(e) => props.setValue(e.target.value)}
      value={props.value}
    />
  );
};

export default Input;
