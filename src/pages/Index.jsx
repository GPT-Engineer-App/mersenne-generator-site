import React, { useState } from "react";
import { Box, Button, Container, Heading, Text, VStack, useToast } from "@chakra-ui/react";
import { FaCalculator } from "react-icons/fa";

const isMersennePrime = (p) => {
  let s = 4;
  for (let i = 0; i < p - 2; i++) {
    s = (s * s - 2) % (2 ** p - 1);
  }
  return s === 0;
};

const Index = () => {
  const [calculating, setCalculating] = useState(false);
  const [mersennePrimes, setMersennePrimes] = useState([]);
  const toast = useToast();

  const calculateMersennePrime = () => {
    setCalculating(true);
    const nextPrimeCandidate = mersennePrimes.length + 3; // Simple prime candidate generator for example
    setTimeout(() => {
      if (isMersennePrime(nextPrimeCandidate)) {
        setMersennePrimes([...mersennePrimes, 2 ** nextPrimeCandidate - 1]);
        toast({
          title: "New Mersenne Prime Found!",
          description: `2^${nextPrimeCandidate} - 1 is a Mersenne prime.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Calculation Complete",
          description: `2^${nextPrimeCandidate} - 1 is not a Mersenne prime.`,
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      }
      setCalculating(false);
    }, 1000); // Simulate delay for calculation
  };

  return (
    <Container centerContent>
      <VStack spacing={5} marginY={10}>
        <Heading>Mersenne Prime Calculator</Heading>
        <Text>Contribute to finding new Mersenne primes!</Text>
        <Button leftIcon={<FaCalculator />} colorScheme="purple" isLoading={calculating} loadingText="Calculating" onClick={calculateMersennePrime}>
          Calculate Next Mersenne Prime
        </Button>
        <Box>
          <Heading size="md">Found Mersenne Primes</Heading>
          {mersennePrimes.length > 0 ? mersennePrimes.map((prime, index) => <Text key={index}>{prime}</Text>) : <Text>No Mersenne primes found yet.</Text>}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
