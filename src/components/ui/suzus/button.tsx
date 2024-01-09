import IconWrapper24 from "./icon-wrapper-24px";

type ButtonSuzuProps = {
  LeadingIcon: boolean;
  Text: string;
  TailingIcon: boolean;
};

const ButtonSuzu: React.FC<ButtonSuzuProps> = ({ LeadingIcon, Text, TailingIcon }) => {
  return (
    <div className="flex p-15 items-start gap-15 rounded bg-Blue-50  ">
      {(() => {
        if (LeadingIcon) {
          return (
            <div>
              <IconWrapper24 Icon={'Placeholder'} Union={false} />
            </div>
          )
        }
        if (Text) {
          return (
            <div>
              {Text}
            </div>
          )
        }

      })()}
    </div>
  )
};

export default ButtonSuzu;