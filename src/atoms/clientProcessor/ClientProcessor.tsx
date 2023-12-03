"use client";

import React, { useState, useEffect } from "react";
import ClientProcessorProps from "@atoms/clientProcessor/interfaces/clientProcessor.interface";

const ClientProcessor: React.FC<ClientProcessorProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div>{children}</div>;
};

export default ClientProcessor;
