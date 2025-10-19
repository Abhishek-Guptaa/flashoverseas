// Email Service for Contact Form
// This is a template file - update with your actual SMTP credentials

interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  message: string;
}

// Example using Nodemailer (install with: npm install nodemailer @types/nodemailer)
/*
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'your-smtp-host.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'your-email@yourdomain.com',
    pass: process.env.SMTP_PASS || 'your-email-password'
  }
});

export const sendEmail = async (formData: FormData) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER || 'your-email@yourdomain.com',
      to: 'info@flashoverseas.com', // Your business email
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Country:</strong> ${formData.country || 'Not specified'}</p>
        <p><strong>Service Interest:</strong> ${formData.service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
        <hr>
        <p><em>This message was sent from the Flash Overseas website contact form.</em></p>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
*/

// Alternative: Using EmailJS (client-side solution)
// Install with: npm install @emailjs/browser
/*
import emailjs from '@emailjs/browser';

export const sendEmail = async (formData: FormData) => {
  try {
    // Initialize EmailJS with your public key
    emailjs.init('YOUR_PUBLIC_KEY');
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      country: formData.country,
      service: formData.service,
      message: formData.message,
      to_email: 'info@flashoverseas.com'
    };

    const result = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      templateParams
    );
    
    console.log('Email sent successfully:', result);
    return { success: true, status: result.status };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
*/

// Placeholder function for now
export const sendEmail = async (formData: FormData) => {
  // This is a placeholder - replace with actual email service
  console.log('Form data received:', formData);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For now, just return success
  return { success: true, message: 'Email service not yet configured' };
};
