import React, { useState } from 'react';
import { api } from '../api/client';

const WHATSAPP_NUMBER = '919876543210';
const PHONE_DISPLAY = '+91 98765 43210';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    destination_interest: '',
    travel_date: '',
    num_travelers: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in your name and phone number.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');
    try {
      await api.submitInquiry({
        ...form,
        num_travelers: form.num_travelers ? Number(form.num_travelers) : null,
      });
      setStatus('success');
      setForm({ name: '', phone: '', email: '', destination_interest: '', travel_date: '', num_travelers: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again or contact us on WhatsApp.');
    }
  }

  return (
    <>
      <section className="bg-teal py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-marigold text-ink text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full">
            Contact & Booking
          </span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white mt-6">Let's Plan Your Trip</h1>
          <p className="text-white/85 mt-4 max-w-xl mx-auto">
            Fill in the form, message us on WhatsApp, or call directly &mdash; whichever's easiest for you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-10">
        {/* Quick contact options */}
        <div className="space-y-5 order-2 lg:order-1">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Harthika Travels! I'd like to enquire about a tour package.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-postcard p-5 hover:bg-[#25D366]/20 transition-colors focus-ring"
          >
            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.738-.868-2.878-1.549-4.024-3.512-.305-.526.305-.489.875-1.629.097-.198.05-.371-.05-.52-.099-.149-.668-1.611-.916-2.207-.247-.595-.5-.515-.69-.524-.197-.01-.42-.012-.644-.012-.224 0-.587.085-.81.41-.223.327-.85 1.131-.85 2.624 0 1.493 1.075 2.933 1.222 3.133.148.198 2.024 3.272 5.123 4.453 3.099 1.182 3.099.788 3.652.738.554-.05 1.798-.736 2.05-1.448.252-.713.252-1.323.176-1.448-.075-.124-.297-.198-.594-.347z"/></svg>
            </div>
            <div>
              <p className="font-semibold text-ink">Chat on WhatsApp</p>
              <p className="text-sm text-ink/60">Fastest way to reach us</p>
            </div>
          </a>

          <a
            href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`}
            className="flex items-center gap-4 bg-white border border-ink/10 rounded-postcard p-5 hover:border-sunset transition-colors focus-ring"
          >
            <div className="w-12 h-12 rounded-full bg-sunset/10 flex items-center justify-center flex-shrink-0 text-sunset text-xl">
              📞
            </div>
            <div>
              <p className="font-semibold text-ink">Call Us</p>
              <p className="text-sm text-ink/60">{PHONE_DISPLAY}</p>
            </div>
          </a>

          <div className="flex items-center gap-4 bg-white border border-ink/10 rounded-postcard p-5">
            <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 text-teal text-xl">
              ✉️
            </div>
            <div>
              <p className="font-semibold text-ink">Email Us</p>
              <p className="text-sm text-ink/60">booking@harthikatravels.in</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white border border-ink/10 rounded-postcard p-5">
            <div className="w-12 h-12 rounded-full bg-marigold/20 flex items-center justify-center flex-shrink-0 text-xl">
              📍
            </div>
            <div>
              <p className="font-semibold text-ink">Visit Us</p>
              <p className="text-sm text-ink/60">Madurai, Tamil Nadu, India</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="postcard p-6 sm:p-8">
            <h2 className="font-display font-semibold text-2xl text-ink mb-1">Send Us an Enquiry</h2>
            <p className="text-ink/60 text-sm mb-6">We typically respond within a few hours.</p>

            {status === 'success' && (
              <div className="bg-teal/10 border border-teal/30 text-teal-dark rounded-lg p-4 mb-6 text-sm font-medium">
                Thank you! We've received your enquiry and will contact you shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="bg-sunset/10 border border-sunset/30 text-sunset-dark rounded-lg p-4 mb-6 text-sm font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="block text-sm font-semibold text-ink mb-1.5">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal"
                  placeholder="Your name"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="phone" className="block text-sm font-semibold text-ink mb-1.5">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="block text-sm font-semibold text-ink mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal"
                  placeholder="you@example.com"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="destination_interest" className="block text-sm font-semibold text-ink mb-1.5">
                  Destination of Interest
                </label>
                <input
                  id="destination_interest"
                  name="destination_interest"
                  value={form.destination_interest}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal"
                  placeholder="e.g. Ooty, Madurai"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="travel_date" className="block text-sm font-semibold text-ink mb-1.5">
                  Preferred Travel Date
                </label>
                <input
                  id="travel_date"
                  name="travel_date"
                  type="date"
                  value={form.travel_date}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="num_travelers" className="block text-sm font-semibold text-ink mb-1.5">
                  Number of Travellers
                </label>
                <input
                  id="num_travelers"
                  name="num_travelers"
                  type="number"
                  min="1"
                  value={form.num_travelers}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal"
                  placeholder="e.g. 4"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold text-ink mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-lg border border-ink/15 px-4 py-2.5 focus-ring focus:border-teal resize-none"
                  placeholder="Tell us a bit about the trip you have in mind..."
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto rounded-full bg-sunset text-white font-semibold px-8 py-3.5 hover:bg-sunset-dark transition-colors focus-ring disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
