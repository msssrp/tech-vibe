"use client";
import React, { useContext, useEffect, useState } from "react";
import InformationSection from "./InformationSection";
import Image from "next/image";
import { Loader, Skeleton } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { ipfsData } from "@/types/article/article";
import UseCertificateData from "./useCertificateSec";
import { useRouter } from "next/router";
import { CertificateContext } from "../../context/Certificate";
type certificateProps = {
  certificateId: string;
};

const CertificateSec: React.FC<certificateProps> = ({ certificateId }) => {
  const { provider } = useContext(CertificateContext);
  const {
    setIsLoading,
    isLoading,
    contractAddress,
    currentUrl,
    certData,
    ownerOfToken,
    error,
  } = UseCertificateData(certificateId, provider);
  const gateway_url = process.env.NEXT_PUBLIC_GATEWAY_URL as string;
  const clipboard = useClipboard({ timeout: 2000 });
  const certDate = new Date(Number(certData.timestamp) * 1000);
  const yearCert = certDate.getUTCFullYear().toString();
  const fullDate = `${certDate.getUTCFullYear()}-${
    certDate.getUTCMonth() + 1
  }-${certDate.getUTCDate()}`;

  const [certificateData, setCertificateData] = useState<ipfsData>({
    title: "",
    description: "",
    image: "",
    blogName: "",
    author: "",
    name: "",
  });
  const cidIpfs = certData.ipfsUrl.replace("ipfs://", "");
  useEffect(() => {
    setIsLoading(true);
    const getCertificateData = async () => {
      const cid = certData.ipfsUrl.replace("ipfs://", "");
      const url = `${gateway_url}/ipfs/${cid}`;
      const resp = await fetch(url);
      if (!resp.ok) return console.error("Failed to fetch certificate data");
      const data = (await resp.json()) as ipfsData;
      console.log(data);
      const imageCid = data.image.replace("ipfs://", "");
      setCertificateData({
        title: data.title,
        description: data.description,
        image: imageCid,
        blogName: data.blogName,
        author: data.author,
        name: data.name,
      });
      setIsLoading(false);
    };
    getCertificateData();
  }, [certData]);
  console.log(certificateData);

  return (
    <div className="container max-w-[1100px] relative mx-auto flex space-x-7 justify-center">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader size={22} />
        </div>
      ) : (
        <>
          <div className="flex flex-col w-1/2 space-y-4">
            <div className="w-full flex flex-col items-start justify-start">
              <div className="h-[350px] w-full">
                {isLoading ? (
                  <Skeleton height={350} width={550} />
                ) : (
                  <Image
                    width={450}
                    height={350}
                    src={`${gateway_url}/ipfs/${certificateData.image}`}
                    alt={certificateData.blogName}
                    className="h-full w-full"
                  />
                )}
              </div>

              <div className="p-3 flex items-center space-x-3 border w-full shadow-md">
                <button
                  onClick={() =>
                    clipboard.copy(
                      `${gateway_url}/ipfs/${certificateData.image}`
                    )
                  }
                >
                  {clipboard.copied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  )}
                </button>
                <a
                  href={`${gateway_url}/ipfs/${certificateData.image}`}
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.3}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex flex-col w-full border rounded-sm">
              <InformationSection
                title="IPFS Image"
                data={`${gateway_url}/ipfs/${certificateData.image}`}
                withBtn={true}
                showView={true}
              />
              <InformationSection
                title="Token URI"
                data={`${gateway_url}/ipfs/${cidIpfs}`}
                withBtn={true}
                showView={true}
              />
              <InformationSection
                title="Token ID"
                data={certificateId}
                withBtn={true}
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col space-y-4 mt-6">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-semibold">
                Certificate of Merit for Engaging Content # {certificateId}
              </span>
              <a
                href={`https://testnets.opensea.io/assets/sepolia/${contractAddress}/${certificateId}`}
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </a>
            </div>
            <div className="flex space-x-2 w-3/4 font-medium">
              <span>Owned</span>
              <span>by</span>
              <span>
                {ownerOfToken.substring(0, 6)}...
                {ownerOfToken.substring(ownerOfToken.length - 10)}
              </span>
              <button onClick={() => clipboard.copy(ownerOfToken)}>
                {clipboard.copied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                )}
              </button>
              <a
                href={`https://reiscan.com/address/${ownerOfToken}`}
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </a>
            </div>
            <div className="border rounded-md flex flex-col">
              <InformationSection
                title="Certificate URI"
                data={`${currentUrl}`}
                withBtn={true}
              />
              <InformationSection
                title="Certificate ID"
                data={certificateId}
                withBtn={true}
              />
              <InformationSection
                title="Certificate type"
                data={"Certificate of Merit for Engaging Content"}
              />
              <InformationSection
                title="Blog Name"
                data={certificateData.blogName}
              />
              <InformationSection
                title="Owner Name"
                data={certificateData.author}
              />
              <InformationSection title="Year" data={yearCert} />
              <InformationSection title="Date" data={fullDate} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CertificateSec;
