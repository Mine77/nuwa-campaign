import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

export const Greeting = () => {
    const { data: session } = useSession();
    const twitterName = session?.user?.name || 'there';

    return (
        <div className="flex flex-col items-center justify-center p-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-semibold"
            >
                Hello {twitterName}!
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-500 dark:text-gray-400 mt-2"
            >
                Which campaign do you wanna participate in?
            </motion.div>
        </div>
    );
}; 