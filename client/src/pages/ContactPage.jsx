import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSending(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "customersupport@gculture.in",
      href: "mailto:customersupport@gculture.in",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hyderabad, India",
      href: null,
    },
  ];

  const socials = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: MessageCircle, label: "WhatsApp", href: "#" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="w-full min-h-screen bg-[#050507] text-white pt-28 md:pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]/50 mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-base text-gray-400 max-w-lg mx-auto">
            Have a question, feedback, or just want to say hi? We'd love to hear
            from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* LEFT — Contact Form */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="lg:col-span-3"
          >
            <div className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 pl-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-white/[0.04] border border-[#d4af37]/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#d4af37]/30 transition-colors duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 pl-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-white/[0.04] border border-[#d4af37]/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#d4af37]/30 transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 pl-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full bg-white/[0.04] border border-[#d4af37]/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#d4af37]/30 transition-colors duration-200"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2 pl-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows={5}
                    className="w-full bg-white/[0.04] border border-[#d4af37]/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#d4af37]/30 transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                    sending
                      ? "bg-[#d4af37]/30 text-[#d4af37]/50 cursor-not-allowed"
                      : "bg-[#d4af37] text-black hover:bg-[#c09b33] hover:shadow-lg hover:shadow-[#d4af37]/20"
                  }`}
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT — Contact Info */}
          <motion.div
            initial="hidden"
            animate="show"
            className="lg:col-span-2 space-y-4"
          >
            {/* Contact Cards */}
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i + 1}
                variants={fadeUp}
                className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors duration-200"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-300">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Socials */}
            <motion.div
              custom={4}
              variants={fadeUp}
              className="bg-white/[0.03] border border-[#d4af37]/10 rounded-2xl p-5"
            >
              <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-4">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="w-10 h-10 rounded-full border border-[#d4af37]/15 flex items-center justify-center text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5 transition-all duration-200"
                    title={s.label}
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              custom={5}
              variants={fadeUp}
              className="bg-gradient-to-br from-[#d4af37]/10 via-[#050507] to-[#d4af37]/5 border border-[#d4af37]/10 rounded-2xl p-5"
            >
              <p className="text-[10px] uppercase tracking-wider text-[#d4af37]/50 mb-3">
                Business Hours
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Mon – Fri</span>
                  <span className="text-gray-300">10:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Saturday</span>
                  <span className="text-gray-300">11:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Sunday</span>
                  <span className="text-[#d4af37]/60">Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
