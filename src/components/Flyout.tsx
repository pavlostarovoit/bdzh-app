import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';

interface FlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  zIndex?: number;
}

export function Flyout({ isOpen, onClose, children, zIndex = 40 }: FlyoutProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - 90% opacity background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background z-[40]"
            style={{ zIndex }}
          />
          
          {/* Slide-up Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[41] flex flex-col items-center justify-end pointer-events-none"
            style={{ zIndex: zIndex + 1 }}
          >
            {/* Inner container */}
            <div className="w-full bg-card rounded-t-[var(--radius)] shadow-[var(--elevation-sm)] pointer-events-auto max-h-[90vh] flex flex-col overflow-hidden">
               {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}