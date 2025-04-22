import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { GridCards } from '../cards/GridCards';
import DotExpandButton from './DotExpandButton';
import { SuggestedActions } from './SuggestedActions';

interface MissionsProps {
    showGridCards: boolean;
    onCloseGridCards: () => void;
    onSelectSuggestion: (suggestion: string) => void;
    onShowGridCards: () => void;
}

export function Missions({
    showGridCards,
    onCloseGridCards,
    onSelectSuggestion,
    onShowGridCards
}: MissionsProps) {

    if (showGridCards) {
        return (
            <motion.div
                className="relative flex-1 overflow-auto"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <motion.button
                    onClick={onCloseGridCards}
                    className="sticky top-4 float-right z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FiX className="text-xl text-slate-800" />
                </motion.button>
                <GridCards
                    onSelectSuggestion={onSelectSuggestion}
                    onCloseGridCards={onCloseGridCards}
                />
            </motion.div>
        );
    }

    return (
        <div className="flex flex-col w-full px-8">
            <motion.div
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <motion.h2
                    className="text-lg font-medium text-slate-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                >
                    Suggested Missions
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <DotExpandButton
                        text="More Missions"
                        onClick={onShowGridCards}
                    />
                </motion.div>
            </motion.div>
            <SuggestedActions onSelectSuggestion={onSelectSuggestion} />
        </div>
    );
} 