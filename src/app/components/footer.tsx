import { Box, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { InstagramIcon, LinkedinIcon } from "lucide-react";
import Checkerboard from "./checkerboard";

const Footer = () => {
  return (
    <footer className="relative h-full w-full bg-retroWhite text-retroBlue">
      <Checkerboard scrollXTop={0} />

      <Flex
        align="center"
        justify="center"
        gap="4"
        className="max-w-6xl mx-auto py-8 "
      >
        <Image
          src="/images/logos/hplogo.png"
          alt="HPLogo"
          width={0}
          height={0}
          sizes="100vw"
          className="px-2 h-16 w-auto"
        />
        <Flex direction="column" gap="2" className="text-lg whitespace-nowrap">
          <Box>© 2025 HackPrinceton</Box>
          <Flex gap="4" align="center" className="transition-all">
            <span className="text-xs">FOLLOW OUR SOCIALS:</span>
            <a
              href="https://www.instagram.com/hackprinceton/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-retroRed transition-all"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/hackprinceton/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-retroRed transition-all"
            >
              <LinkedinIcon />
            </a>
          </Flex>
          {/* <Flex
            direction="row"
            align="center"
            className="text-xs hover:underline hover:text-red-600 transition-all"
          >
            <a
              href="https://www.princetoneclub.com/hackprinceton#:~:text=HackPrinceton%20is%20one%20of%20the,respected%20amongst%20the%20hacker%20community."
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more about HackPrinceton
            </a>{" "}
            <LogOutIcon className="h-3" />
          </Flex> */}
        </Flex>
      </Flex>
      <Checkerboard scrollXTop={0} />
    </footer>
  );
};

export default Footer;
