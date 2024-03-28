type Props = {
  children: React.ReactNode;
};

const LessonLayoutPage = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col h-full w-full">{children}</div>
    </div>
  );
};

export default LessonLayoutPage;
