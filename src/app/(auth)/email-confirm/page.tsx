"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";

import { MobileLogo } from "@/presentation/ui/MobileLogo";
import { SectionTitle } from "@/presentation/widgets/common/SectionTitle";
import MainContainer from "@/presentation/widgets/primitives/MainContainer";
import { Spacer } from "@/presentation/widgets/primitives/Spacer";
import { ASSETS } from "@/infrastructure/config/assets";
import { SubmitButton } from "@/presentation/ui/SubmitButton";
import EmailResendContainer from "@/presentation/widgets/auth/EmailConfirm/EmailResendContainer";
import { emailConfirmTexts } from "@/shared/locales/emailConfirm";
import { useEmailConfirm } from "@/application/auth/hooks/useEmailConfirm";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 241px;
  height: 197px;
  background-color: #ebebeb;
  border: none;
  border-radius: 15px;
`;

export default function EmailConfirmPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "example@gmail.com";
  const emailConfirm = useEmailConfirm(email);

  return (
    <MainContainer>
      <MobileLogo />
      <Spacer size="56px" />
      <SectionTitle
        title={emailConfirmTexts.title}
        subtitle={emailConfirmTexts.subtitle(email)}
      />
      <Spacer size="12px" />
      <ImageContainer>
        <Image
          src={ASSETS.icons.image}
          alt={emailConfirmTexts.imageAltText}
          width={63}
          height={43}
        />
      </ImageContainer>
      <Spacer size="57px" />
      <EmailResendContainer
        initialDelay={10}
        onResend={emailConfirm.resendEmail}
      ></EmailResendContainer>
      <SubmitButton $variant="primary" onClick={emailConfirm.openUserInbox}>
        {emailConfirmTexts.openEmail}
      </SubmitButton>
    </MainContainer>
  );
}
