"use client";
import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <div className="absolute bottom-0 pt-5 ">
      <LinkedInIcon className="mx-3 hover:scale-125 transition-all" />
      <GitHubIcon className="mx-3 hover:scale-125 transition-all" />
      <TwitterIcon className="mx-3 hover:scale-125 transition-all" />
      <InstagramIcon className="mx-3 hover:scale-125 transition-all" />
      <FacebookOutlinedIcon className="mx-3 hover:scale-125 transition-all" />
    </div>
  );
};

export default Footer;
