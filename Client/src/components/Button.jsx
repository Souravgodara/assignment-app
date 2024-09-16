import { cn } from "../utils/utils";
import PropTypes from "prop-types";
import ButtonLoadingSpinner from "./ButtonLoadingSpinner";

export default function Button({
  children,
  className,
  loadingText = "Loading...",
  isLoading,
  ...props
}) {
  return (
    <button
      disabled={isLoading}
      className={cn(
        `w-full transform rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none`,
        {
          "cursor-not-allowed opacity-50": isLoading,
        },
        className
      )}
      {...props}>
      {isLoading ? (
        <ButtonLoadingSpinner loadingText={loadingText} />
      ) : (
        children
      )}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
};
