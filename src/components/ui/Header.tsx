import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Button,
  Image,
  Link,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { ConfirmationModal } from './ConfirmationModal';

const MotionBox = motion.create(Box);

// NavLink component - uses Link from Chakra with asChild pattern
const NavLink = ({ to, children, isActive }: { to: string; children: React.ReactNode; isActive: boolean }) => (
  <Link asChild>
    <RouterLink
      to={to}
      style={{
        padding: '6px 12px',
        borderRadius: '9999px',
        fontSize: '0.9375rem',
        fontWeight: '500',
        color: isActive ? '#111827' : '#4B5563',
        backgroundColor: isActive ? '#F3F4F6' : 'transparent',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </RouterLink>
  </Link>
);

// MobileNavLink component
const MobileNavLink = ({ to, children, onClick, isActive }: { to: string; children: React.ReactNode; onClick: () => void; isActive: boolean }) => (
  <Link asChild>
    <RouterLink
      to={to}
      onClick={onClick}
      style={{
        padding: '16px 12px',
        borderRadius: '8px',
        fontSize: '1rem',
        color: isActive ? '#111827' : '#374151',
        backgroundColor: isActive ? '#F3F4F6' : 'transparent',
        fontWeight: isActive ? '600' : '500',
        display: 'block',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </RouterLink>
  </Link>
);

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getDisplayName = () => {
    if (!user) return '';
    return user.displayName || user.email?.split('@')[0] || 'User';
  };

  const isActivePath = (path: string) => location.pathname === path;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      bg={isScrolled ? "rgba(255, 255, 255, 0.7)" : "transparent"}
      backdropFilter={isScrolled ? "blur(12px)" : "blur(0px)"}
      borderBottom={isScrolled ? "1px solid rgba(0,0,0,0.05)" : "none"}
      py={4}
      transition="all 0.3s ease"
    >
      {/* Centered Container */}
      <Flex
        maxW="1280px"
        mx="auto"
        px={6}
        py={2}
        align="center"
        justify="space-between"
        bg="transparent"
        borderRadius="none"
        boxShadow="none"
        w="100%"
        transition="all 0.3s ease"
      >
        {/* Logo */}
        <Link asChild>
          <RouterLink
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
          >
            <Box
              as="span"
              color="brand.600"
              display="flex"
              alignItems="center"
              width="28px"
              height="28px"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" width="100%" height="100%">
                <path d="M392.8 65.2C375.8 60.3 358.1 70.2 353.2 87.2L225.2 535.2C220.3 552.2 230.2 569.9 247.2 574.8C264.2 579.7 281.9 569.8 286.8 552.8L414.8 104.8C419.7 87.8 409.8 70.1 392.8 65.2zM457.4 201.3C444.9 213.8 444.9 234.1 457.4 246.6L530.8 320L457.4 393.4C444.9 405.9 444.9 426.2 457.4 438.7C469.9 451.2 490.2 451.2 502.7 438.7L598.7 342.7C611.2 330.2 611.2 309.9 598.7 297.4L502.7 201.4C490.2 188.9 469.9 188.9 457.4 201.4zM182.7 201.3C170.2 188.8 149.9 188.8 137.4 201.3L41.4 297.3C28.9 309.8 28.9 330.1 41.4 342.6L137.4 438.6C149.9 451.1 170.2 451.1 182.7 438.6C195.2 426.1 195.2 405.8 182.7 393.3L109.3 320L182.6 246.6C195.1 234.1 195.1 213.8 182.6 201.3z" />
              </svg>
            </Box>
            <Text
              fontSize="1.25rem"
              fontWeight="700"
              fontFamily="'Satoshi', sans-serif"
              letterSpacing="-0.01em"
              color="gray.900"
            >
              CodeZapra
            </Text>
          </RouterLink>
        </Link>

        {/* Desktop Navigation */}
        <HStack gap={6} display={{ base: 'none', md: 'flex' }} px={4}>
          <NavLink to="/courses" isActive={isActivePath('/courses')}>Courses</NavLink>
          <NavLink to="/how-it-works" isActive={isActivePath('/how-it-works')}>How It Works</NavLink>
          <NavLink to="/about" isActive={isActivePath('/about')}>About</NavLink>
        </HStack>

        {/* Desktop Actions */}
        <HStack gap={2} display={{ base: 'none', md: 'flex' }} pl={4}>
          {user ? (
            <>
              <Link asChild>
                <RouterLink
                  to="/profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease',
                  }}
                >
                  {user.photoURL && !imageLoadError ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      w={7}
                      h={7}
                      borderRadius="full"
                      objectFit="cover"
                      onError={() => setImageLoadError(true)}
                    />
                  ) : (
                    <Flex
                      w={7}
                      h={7}
                      borderRadius="full"
                      bg="brand.500"
                      color="white"
                      align="center"
                      justify="center"
                      fontWeight="600"
                      fontSize="0.75rem"
                    >
                      {getDisplayName().charAt(0).toUpperCase()}
                    </Flex>
                  )}
                  <Text
                    fontSize="0.875rem"
                    fontWeight="500"
                    color="gray.700"
                    display={{ base: 'none', lg: 'block' }}
                  >
                    {getDisplayName()}
                  </Text>
                </RouterLink>
              </Link>
              <Button
                onClick={handleLogout}
                h={10}
                px={5}
                fontSize="0.875rem"
                fontWeight="500"
                color="gray.700"
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="full"
                cursor="pointer"
                _hover={{
                  bg: 'gray.50',
                  borderColor: 'gray.300',
                  cursor: 'pointer'
                }}
                transition="all 0.2s ease"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link asChild>
                <RouterLink to="/signup" style={{ textDecoration: 'none' }}>
                  <Button
                    h={10}
                    px={5}
                    fontSize="0.875rem"
                    fontWeight="600"
                    color="white"
                    bg="linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%)"
                    borderRadius="full"
                    cursor="pointer"
                    _hover={{
                      filter: 'brightness(1.1)',
                      cursor: 'pointer'
                    }}
                    transition="all 0.2s ease"
                  >
                    Get full access
                  </Button>
                </RouterLink>
              </Link>
              <Link asChild>
                <RouterLink to="/login" style={{ textDecoration: 'none' }}>
                  <Button
                    h={10}
                    px={5}
                    fontSize="0.875rem"
                    fontWeight="500"
                    color="gray.700"
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="full"
                    cursor="pointer"
                    _hover={{
                      bg: 'gray.50',
                      borderColor: 'gray.300',
                      cursor: 'pointer'
                    }}
                    transition="all 0.2s ease"
                  >
                    Sign In
                  </Button>
                </RouterLink>
              </Link>
            </>
          )}
        </HStack>

        {/* Mobile Menu Toggle */}
        <Box
          as="button"
          display={{ base: 'flex', md: 'none' }}
          alignItems="center"
          justifyContent="center"
          w={10}
          h={10}
          ml={2}
          bg="transparent"
          border="none"
          color="gray.700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          borderRadius="full"
          _hover={{ bg: 'gray.50' }}
          transition="background 0.2s ease"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isMobileMenuOpen ? (
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </Box>
      </Flex>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MotionBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            position="absolute"
            top="80px"
            left={4}
            right={4}
            bg="white"
            borderRadius="2xl"
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
            overflow="hidden"
          >
            <VStack align="stretch" p={4}>
              <MobileNavLink to="/courses" onClick={() => setIsMobileMenuOpen(false)} isActive={isActivePath('/courses')}>
                Courses
              </MobileNavLink>
              <MobileNavLink to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)} isActive={isActivePath('/how-it-works')}>
                How It Works
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} isActive={isActivePath('/about')}>
                About
              </MobileNavLink>

              <VStack gap={3} pt={4}>
                {user ? (
                  <>
                    <Link asChild w="full">
                      <RouterLink
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          width: '100%',
                          borderRadius: '12px',
                          backgroundColor: '#F9FAFB',
                          textDecoration: 'none',
                          transition: 'background 0.2s ease',
                        }}
                      >
                        {user.photoURL ? (
                          <Image
                            src={user.photoURL}
                            alt="Profile"
                            w={10}
                            h={10}
                            borderRadius="full"
                            objectFit="cover"
                          />
                        ) : (
                          <Flex
                            w={10}
                            h={10}
                            borderRadius="full"
                            bg="brand.500"
                            color="white"
                            align="center"
                            justify="center"
                            fontWeight="600"
                            fontSize="0.875rem"
                          >
                            {getDisplayName().charAt(0).toUpperCase()}
                          </Flex>
                        )}
                        <VStack align="start" gap={0}>
                          <Text fontWeight="600" color="gray.900" fontSize="1rem">
                            {getDisplayName()}
                          </Text>
                          <Text fontSize="0.875rem" color="gray.500">
                            View Profile
                          </Text>
                        </VStack>
                      </RouterLink>
                    </Link>
                    <Button
                      onClick={handleLogout}
                      w="full"
                      h={12}
                      fontSize="1rem"
                      fontWeight="500"
                      color="gray.700"
                      bg="white"
                      border="1px solid"
                      borderColor="gray.200"
                      borderRadius="xl"
                      _hover={{ bg: 'gray.50' }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link asChild w="full">
                      <RouterLink
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ textDecoration: 'none', width: '100%' }}
                      >
                        <Button
                          w="full"
                          h={12}
                          fontSize="1rem"
                          fontWeight="600"
                          color="white"
                          bg="linear-gradient(90deg, hsla(214, 92%, 47%, 1) 0%, hsla(231, 85%, 24%, 1) 100%)"
                          borderRadius="xl"
                          _hover={{ filter: 'brightness(1.1)' }}
                        >
                          Get full access
                        </Button>
                      </RouterLink>
                    </Link>
                    <Link asChild w="full">
                      <RouterLink
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ textDecoration: 'none', width: '100%' }}
                      >
                        <Button
                          w="full"
                          h={12}
                          fontSize="1rem"
                          fontWeight="500"
                          color="gray.700"
                          bg="white"
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="xl"
                          _hover={{ bg: 'gray.50' }}
                        >
                          Sign In
                        </Button>
                      </RouterLink>
                    </Link>
                  </>
                )}
              </VStack>
            </VStack>
          </MotionBox>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out of your account?"
        confirmText="Logout"
        cancelText="Cancel"
        isDangerous={true}
      />
    </Box >
  );
};

export default Header;
