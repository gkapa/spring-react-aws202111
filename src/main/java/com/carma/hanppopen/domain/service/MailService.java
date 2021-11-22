package com.carma.hanppopen.domain.service;

import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.model.*;
import com.carma.hanppopen.domain.exception.ApiRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MailService {

    @Autowired
    public AmazonSimpleEmailService amazonSimpleEmailService;

    @Value("${aws.domain-email}")
    private String domainEmail;

    public void sendSignUpEmail(String emailSubject, String receiver, String email, String registKey) {

        String link = "http://localhost:3000/auth/regist?key=" + registKey + "%26email=" + email + "%26";

        String emailContent = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"utf-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
                "    <title>Example HTML Email</title>\n" +
                "</head>\n" +
                "<body style=\"background: whitesmoke; padding: 30px; height: 100%\">\n" +
                "<h5 style=\"font-size: 18px; margin-bottom: 6px\">登録認証メール</h5>\n" +
                "<p style=\"font-size: 16px; font-weight: 500\">登録認証メールです。</p>\n" +
                "<p>下記リンクをクリックすると登録が完了します。</p>\n" +
                "<a href=\"" + link + "\">" + link + "</a>\n" +
                "</body>\n" +
                "</html>";

        String senderEmail = "noreply@" + domainEmail;
        String receiverEmail = email;

        try {
            SendEmailRequest sendEmailRequest = new SendEmailRequest()
                    .withDestination(
                            new Destination().withToAddresses(receiverEmail))
                    .withMessage(new Message()
                            .withBody(new Body().withHtml(
                                    new Content().withCharset("UTF-8").withData(emailContent)))
                            .withSubject(new Content().withCharset("UTF-8").withData(emailSubject)))
                    .withSource(senderEmail);
            amazonSimpleEmailService.sendEmail(sendEmailRequest);

        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiRequestException("email address malformed: " + email);
        }
    }
}
