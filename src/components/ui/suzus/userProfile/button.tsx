type ButtonSuzuProps = {
  LeadingIcon: boolean;
  Text: string;
  TailingIcon: boolean;
};

const ButtonSuzu: React.FC<ButtonSuzuProps> = ({ LeadingIcon, Text, TailingIcon }) => {
  return (
    <div className="flex justify-center items-start flex-1 border-b border-slate-900 border-solid ">
      {Text && (
        <div className="flex px-4 py-2 items-start gap-2 rounded-[999px]">
          <p className="text-slate-900 font-openSans text-15 font-semibold not-italic leading-6">{Text}</p>
        </div>
      )}

    </div>

  );
};

export default ButtonSuzu;