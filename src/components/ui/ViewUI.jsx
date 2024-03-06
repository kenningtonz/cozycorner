import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faDownload } from "@fortawesome/free-solid-svg-icons";
import { createScreenshot, saveUserData } from "@gameStore";

const ViewUI = ({ sound }) => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 100 }}
			key={"envUI"}
			animate={{ opacity: 1, y: 0 }}
			exit={{ y: 100, opacity: 0 }}
			className='rainbowBorder pointer-events-auto '
		>
			<div className=' rainbowInner flex items-center gap-4 p-4'>
				<motion.button
					onClick={() => {
						sound();
						createScreenshot();
					}}
					// whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className={`iconBtn green relative`}
				>
					<FontAwesomeIcon size='xl' icon={faDownload} />
				</motion.button>
				<motion.button
					onClick={() => {
						sound();
						saveUserData();
					}}
					// whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className={`iconBtn green relative`}
				>
					<FontAwesomeIcon size='xl' icon={faFloppyDisk} />
				</motion.button>
			</div>
		</motion.section>
	);
};

export default ViewUI;
