import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  VStack,
  HStack,
} from '@chakra-ui/react';

const MotionBox = motion.create(Box);

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Flex
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0, 0, 0, 0.5)"
        align="center"
        justify="center"
        zIndex={1000}
        backdropFilter="blur(4px)"
        onClick={onClose}
      >
        <MotionBox
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          bg="white"
          p={8}
          borderRadius="2xl"
          maxW="400px"
          w="90%"
          boxShadow="xl"
          textAlign="center"
        >
          <VStack gap={4}>
            {/* Icon */}
            <Flex
              w={12}
              h={12}
              borderRadius="full"
              bg={isDangerous ? 'error.100' : 'brand.100'}
              color={isDangerous ? 'error.600' : 'brand.600'}
              align="center"
              justify="center"
              fontSize="1.5rem"
            >
              {isDangerous ? '⚠️' : 'ℹ️'}
            </Flex>

            {/* Title */}
            <Heading
              as="h3"
              fontSize="1.25rem"
              color="text.primary"
              fontWeight="600"
            >
              {title}
            </Heading>

            {/* Message */}
            <Text
              color="text.secondary"
              fontSize="1rem"
              lineHeight="1.5"
            >
              {message}
            </Text>

            {/* Actions */}
            <HStack gap={4} w="full" mt={4}>
              <Button
                onClick={onClose}
                flex={1}
                variant="outline"
                borderColor="border.default"
                color="text.primary"
                _hover={{ bg: 'bg.secondary' }}
              >
                {cancelText}
              </Button>
              <Button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                flex={1}
                bg={isDangerous ? 'error.500' : 'brand.600'}
                color="white"
                _hover={{ bg: isDangerous ? 'error.600' : 'brand.700' }}
              >
                {confirmText}
              </Button>
            </HStack>
          </VStack>
        </MotionBox>
      </Flex>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
