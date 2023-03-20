import React from "react";

type Props = {
  title: string;
  autoalign?: boolean;
};

const PageTitle = (props: Props) => {
  return (
    <h1 className={`text-5xl mb-6 ${props.autoalign && "w-full text-center"}`}>
      {props.title}
    </h1>
  );
};

PageTitle.defaultProps = {
  autoalign: true,
};

export default PageTitle;
