import { useState } from 'react';

export default function ContactForm() {
    const [feedback, setFeedback] = useState({ text: '', kind: '' });

    const submit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (name.length < 2) {
            setFeedback({ text: 'Please enter a name with at least 2 characters.', kind: 'error' });
            form.name.focus();
        } else if (!emailLooksValid) {
            setFeedback({ text: 'Please enter a valid email address.', kind: 'error' });
            form.email.focus();
        } else if (message.length < 10) {
            setFeedback({ text: 'Please write a message with at least 10 characters.', kind: 'error' });
            form.message.focus();
        } else {
            setFeedback({ text: 'Looks good! This demo does not send messages, but your form passed validation.', kind: 'success' });
            form.reset();
        }
    };

    return (
        <form id="contact-form" className="glass-card contact-form" noValidate onSubmit={submit}>
            <div className="form-heading">
                <h3>Send a message</h3>
                <p>This demo validates the form locally. It does not send or store messages.</p>
            </div>
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" autoComplete="name" required minLength={2} placeholder="e.g. Alex Santos" />
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={4} required minLength={10} placeholder="What would you like to talk about?" />
            <p className={`form-feedback${feedback.kind ? ` ${feedback.kind}` : ''}`} role="status" aria-live="polite">{feedback.text}</p>
            <button className="button form-submit" type="submit">Validate message <span aria-hidden="true">↗</span></button>
        </form>
    );
}
