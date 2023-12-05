
import * as React from "react";

interface EmailContent {
  name: string;
  post: {
    id: number;
    title: string;
    slug: string;
    userId: string;
    content?: string | null;
    image?: string | null;
  };
}

export const EmailContent: React.FC<Readonly<EmailContent>> = ({
  name,
  post: p,
}) => {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>
        Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim
        labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet.
        Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum
        Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident.
        Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex
        occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat
        officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in
        Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non
        excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco
        ut ea consectetur et est culpa et culpa duis.
      </p>
      <img src={p.image || ''} alt={p.title} />
      <hr />
      <p>Sent with help from Resend and Kirimase 😊</p>
    </div>
  );
};

