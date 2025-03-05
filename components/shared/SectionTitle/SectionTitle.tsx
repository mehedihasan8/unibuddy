const SectionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="mb-12 md:mb-16">
      <h2 className="text-3xl md:text-5xl text-center text-[#221859] font-bold">
        {title}
      </h2>
      <p className="max-w-xl w-full text-center mx-auto mt-2 primary-color">
        {description}
      </p>
    </div>
  );
};

export default SectionTitle;
