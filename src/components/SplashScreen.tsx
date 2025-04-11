'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useVoice } from '@/lib/VoiceContext';

// Create motion versions of Material UI components
const MotionBox = motion(Box);

// Styled components
const SplashContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  z-index: 9999;
`;

const MotionSplashContainer = motion(SplashContainer);

const LogoWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProgressWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const MotionProgressWrapper = motion(ProgressWrapper);

const MessageText = styled(motion.div)`
  margin-top: 1.5rem;
  text-align: center;
  max-width: 80%;
`;

interface SplashScreenProps {
  minimumDisplayTime?: number;
  onLoadComplete?: () => void;
}

export default function SplashScreen({ 
  minimumDisplayTime = 3000,  // Default minimum display time: 3 seconds
  onLoadComplete 
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { speak } = useVoice();
  
  useEffect(() => {
    // Speak welcome message
    speak('Welcome to SADAQAPP, the voice-first inclusive financial aid platform.');
    
    // Set a timer to ensure the splash screen is displayed for at least the minimum time
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onLoadComplete) onLoadComplete();
    }, minimumDisplayTime);
    
    return () => clearTimeout(timer);
  }, [minimumDisplayTime, onLoadComplete, speak]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.3 
      } 
    },
    exit: { 
      opacity: 0,
      transition: { 
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { 
        duration: 0.3
      }
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <MotionSplashContainer
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <LogoWrapper variants={itemVariants}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <Image 
            src="/logo.svg" 
            alt="SADAQAPP Logo" 
            width={150} 
            height={150} 
            priority
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mt: 2 }}>
            SADAQAPP
          </Typography>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Typography variant="h6" component="h2">
            Voice-First, Inclusive Financial Aid
          </Typography>
        </motion.div>
      </LogoWrapper>
      
      <MotionProgressWrapper variants={itemVariants}>
        <CircularProgress size={40} thickness={4} color="inherit" />
        
        <MessageText
          variants={itemVariants}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Typography variant="body1">
            Loading your inclusive financial aid platform...
          </Typography>
        </MessageText>
      </MotionProgressWrapper>
    </MotionSplashContainer>
  );
} 