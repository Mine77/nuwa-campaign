import { motion } from 'framer-motion';
import { MISSIONS } from './missionsData';

interface SuggestedActionsProps {
    onSelectSuggestion: (suggestion: string) => void;
}

export function SuggestedActions({ onSelectSuggestion }: SuggestedActionsProps) {
    const suggestedMissions = MISSIONS.filter(mission => mission.suggested);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-4"
        >
            {suggestedMissions.map((mission, index) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 1.2 + 0.1 * index }}
                    key={`suggestion-${mission.id}`}
                    className={index > 1 ? 'hidden sm:block' : 'block'}
                >
                    <button
                        onClick={() => onSelectSuggestion(mission.suggestionText)}
                        className="text-left border border-gray-200 rounded-xl px-4 py-3 text-sm w-full h-auto flex flex-col justify-start items-start hover:bg-gray-100 transition-colors"
                    >
                        <span className="font-medium">{mission.title}</span>
                        <span className="text-gray-500">
                            {mission.description}
                        </span>
                    </button>
                </motion.div>
            ))}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 1.6 }}
                className="block sm:col-span-2"
            >
            </motion.div>
        </motion.div>
    );
} 