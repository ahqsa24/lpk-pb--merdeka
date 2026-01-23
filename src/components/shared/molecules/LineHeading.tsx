import { Line } from "../atoms";
import { Heading } from "../atoms";

interface LineHeadingProps {
  title: string;
  className?: string;
  lineClassName?: string;
}

export const LineHeading: React.FC<LineHeadingProps> = ({ title, className, lineClassName }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Line className={lineClassName} />
      <Heading level={2} className="text-4xl mt-2 dark:text-white">{title}</Heading>
    </div>
  );
};