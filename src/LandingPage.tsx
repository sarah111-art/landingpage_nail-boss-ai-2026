import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, CheckCircle, Star, User, Zap, X, ArrowRight } from 'lucide-react';


export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  // State quản lý trạng thái gửi (đang gửi, thành công, lỗi)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // ĐIỀN LINK WEB APP URL CỦA GOOGLE APPS SCRIPT VÀO ĐÂY
  const SCRIPT_URL = "DÁN_LINK_GOOGLE_SCRIPT_CỦA_BẠN_VÀO_ĐÂY";
  const [timeLeft, setTimeLeft] = useState(3600); 
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return { h, m, s };
  };

  const { h, m, s } = formatTime(timeLeft);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const scrollToRegister = () => {
    document.getElementById('register-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate cơ bản
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setStatus('submitting');

    // Chuyển data thành định dạng Form Data để gửi đi
    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('email', formData.email);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyaW8uXqQSwRevq_RP_JPMrx2FDViXa7dMljsjcI9E_Hb6s4x_PyJzCOO40BL21qyMO/exec", {
        method: 'POST',
        mode: 'no-cors',
        body: data
      });
      
      setStatus('success');
      // Xóa trắng form sau khi gửi thành công
      setFormData({ name: '', phone: '', email: '' });
      
      // Tùy chọn: Ẩn thông báo thành công sau 5 giây
      setTimeout(() => setStatus('idle'), 5000);
      
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* Navigation (Giữ nguyên) */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="font-serif text-2xl font-bold text-gradient-gold">Nail Boss AI</span>
            </div>
            <button
              onClick={scrollToRegister}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#BF953F] to-[#AA771C] text-black font-bold py-2 px-6 rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all transform hover:scale-105"
            >
              Đăng Ký Ngay <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section (Giữ nguyên) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FCF6BA] text-sm font-semibold tracking-wider mb-6">
              ZOOM MIỄN PHÍ ĐẦU NĂM 2026
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              BÍ QUYẾT <span className="text-gradient-gold">TƯ DUY CHỦ TIỆM</span> <br />
              & ỨNG DỤNG AI 2026
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              Khởi động 2026 với chiến lược vận hành tiệm Nail bài bản, tự động hóa bằng AI.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
              <button
                onClick={scrollToRegister}
                className="w-full sm:w-auto bg-gradient-to-r from-[#BF953F] via-[#FBF5B7] to-[#AA771C] text-black font-bold text-lg py-4 px-10 rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all transform hover:scale-105"
              >
                Đăng Ký Tham Gia Miễn Phí
              </button>
              <button
                onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] font-semibold text-lg py-4 px-10 rounded-full hover:bg-[#D4AF37]/10 transition-all"
              >
                Tìm Hiểu Thêm
              </button>
            </div>

            {/* Speakers Preview */}
            <div className="flex justify-center items-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[#D4AF37] p-1 mx-auto mb-3">
                  <img 
                    src="/images/huygemini.png" 
                    alt="Huy Nails Boss" 
                    className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#D4AF37]">Huy Nails Boss</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Chuyên gia Setup & Vận hành Tiệm Nail</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[#D4AF37] p-1 mx-auto mb-3">
                  <img 
                    src="/images/leader.jpg" 
                    alt="Quốc Nguyễn" 
                    className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#D4AF37]">Quốc Nguyễn</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Chuyên gia AI Marketing</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section (Giữ nguyên) */}
      <section id="details" className="py-20 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
              VẤN ĐỀ BẠN ĐANG GẶP PHẢI<br />
                <span className="text-gradient-gold">Hệ thống tiệm của bạn có đang mắc kẹt trong những rào cản này?</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Vị trí kinh doanh bất lợi: Tiệm khuất tầm nhìn, bãi đậu xe hẹp, vắng khách vãng lai.",
                  "Tiếp thị kém hiệu quả: Trả nhiều tiền cho Agency, chạy quảng cáo không hiệu quả, không đo lường được tỷ lệ chuyển đổi (ROI).",
                  "Cuộc chiến phá giá (Price War): Buộc phải giảm giá liên tục để cạnh tranh, làm mất giá trị thương hiệu và biên độ lợi nhuận.",
                  "Khó giữ chân khách hàng: Thiếu hệ thống chăm sóc tự động khiến khách hàng chỉ đến một lần rồi rời đi.",
                  "Nghịch lý trong kinh doanh: Lợi nhuận thực tế thu về đôi khi còn thấp hơn lương của thợ.",
                  "Mất thợ giỏi vì chia turn cảm tính: Nội bộ tị nạnh, thiếu minh bạch khiến thợ cứng bất mãn, dễ chảy máu nhân sự sang đối thủ."
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-colors"
                  >
                    <div className="mt-1 min-w-[24px]">
                      <X className="text-red-500" />
                    </div>
                    <p className="text-gray-300 text-lg">{item}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#D4AF37] rounded-r-xl">
                <p className="text-xl font-serif italic text-[#FCF6BA]">
                  "👉 Buổi Zoom này dành riêng cho bạn."
                </p>
              </div>
                <button
                  onClick={scrollToRegister}
                  className=" mt-8 w-full sm:w-auto bg-gradient-to-r from-[#BF953F] via-[#FBF5B7] to-[#AA771C] text-black font-bold text-lg py-4 px-10 rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all transform hover:scale-105"
                >
                  Đăng Ký Tham Gia Miễn Phí
                </button>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
               <img 
                 src="/images/nails.png" 
                 alt="Nail Salon Struggle" 
                 className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>


      <section id="details" className="py-20 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-1 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
              KHÓA HỌC NÀY DÀNH CHO AI?<br />

              </h2>
              <div className="space-y-6">
                {[
                  "Chủ tiệm Nail/Spa: Đang tìm kiếm chiến lược tăng doanh thu, thoát khỏi việc cạnh tranh bằng giá.",
                  "Nhà đầu tư chuẩn bị mở tiệm: Cần kiến thức đánh giá mặt bằng (Location), phân tích tệp khách hàng trước khi xuống tiền.",
                  "Quản lý (Manager): Mong muốn áp dụng phần mềm và trí tuệ nhân tạo (A.I) để tự động hóa quy trình vận hành, chăm sóc khách hàng."
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-colors"
                  >
                    <div className="mt-1 min-w-[24px]">
                      <CheckCircle className="text-green-500" />
                    </div>
                    <p className="text-gray-300 text-lg">{item}</p>
                  </motion.div>
                ))}
              </div>
                <button
                  onClick={scrollToRegister}
                  className=" mt-8 w-full sm:w-auto bg-gradient-to-r from-[#BF953F] via-[#FBF5B7] to-[#AA771C] text-black font-bold text-lg py-4 px-10 rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all transform hover:scale-105"
                >
                  Đăng Ký Tham Gia Miễn Phí
                </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF37]/5 blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">Nội Dung <span className="text-gradient-gold">Chia Sẻ Độc Quyền</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <User size={32} />,
                title: "Tối ưu Trải nghiệm Khách hàng (Customer Experience)",
                desc: "Làm chủ 3 điểm chạm: Nắm bắt tâm lý khách Trước, Trong và Sau dịch vụ. Cá nhân hóa không gian: Thiết kế âm nhạc, mùi hương chuẩn gu từng tệp khách. Tăng hạng tìm kiếm: Tuyệt chiêu xin Google Review tự nhiên để lên Top 1  ",
              },
              {
                icon: <Zap size={32} />,
                title: "Chiến lược Marketing Thực chiến & Đo lường ROI",
                desc: "Tối ưu lợi nhuận: Công thức biến $170 tiền quảng cáo thành $1,700 doanh thu. Kéo khách VIP (Cross-Marketing): Bí quyết liên kết chéo với khách sạn, phòng Yoga lân cận. Giải mã Location: Biến bất lợi bãi đậu xe, góc khuất thành lợi thế cạnh tranh "
              },
              {
                icon: <Star size={32} />,
                title: "Quản lý POS & Tự động hóa Chăm sóc khách (CRM)",
                desc: "Tiếp tân AI: Hệ thống POS tự động nghe điện thoại và chốt lịch hẹn. Lọc Data khách hàng: Tự động phân loại khách VIP và khách lâu ngày không đến. SMS Remarketing: Kéo khách cũ quay lại tiệm với chi phí siêu rẻ chỉ 2 cents/tin"
              },
              {
                icon: <CheckCircle size={32} />,
                title: "Ứng dụng AI siêu tốc vào Truyền thông",
                desc: "Content tự động: AI tự lên kịch bản đăng bài Facebook/Instagram suốt 30 ngày. Thiết kế trong 5 giây: Tự làm Poster, Menu theo mùa lễ hội không cần thuê ngoài. E-Voucher độc quyền:  Tạo thiệp điện tử in tên riêng từng khách, gửi thẳng qua SMS"
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:border-[#D4AF37]/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 sm:flex-row items-center gap-2 mb-16 flex">
              <button
                onClick={scrollToRegister}
                className="w-full sm:w-auto bg-gradient-to-r from-[#BF953F] via-[#FBF5B7] to-[#AA771C] text-black font-bold text-lg py-4 px-10 rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all transform hover:scale-105"
              >
                Giữ chỗ trong lớp zoom sắp tới
              </button>
          </div>
          {/* Special Guest */}
          <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-[#D4AF37]/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Star size={200} />
             </div>
             <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
               <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-[#D4AF37] overflow-hidden shrink-0 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                 <img src="/images/huygemini.png" alt="Quốc Nguyễn" className="w-full h-full object-cover" />
               </div>
               <div>
                 <div className="inline-block px-4 py-1 rounded-full bg-[#D4AF37] text-black text-xs font-bold mb-4">FOUNDER NAILS BOSS</div>
                 <h3 className="font-serif text-3xl font-bold mb-2">HUY NAILS BOSS - Chuyên gia Setup & Vận hành Tiệm Nail:</h3>
                 <p className="text-gray-300 text-lg mb-4">
                 Sở hữu hơn 10 năm kinh nghiệm thực chiến dày dặn trong việc tư vấn vận hành và tối ưu hóa hệ thống tiệm Nails. Đang vận hành song song 5 tiệm Nails tại Mỹ. Nội dung chia sẻ dựa hoàn toàn trên dữ liệu thực tế: từ việc đánh giá mặt bằng, thiết kế trải nghiệm dịch vụ đến tối ưu dòng tiền quảng cáo.
                 </p>
               </div>
             </div>
          </div>
          {/* Huy */}
          <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-[#D4AF37]/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Star size={200} />
             </div>
             <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
               <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-[#D4AF37] overflow-hidden shrink-0 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                 <img src="/images/leader.jpg" alt="Quốc Nguyễn" className="w-full h-full object-cover" />
               </div>
               <div>
                 <div className="inline-block px-4 py-1 rounded-full bg-[#D4AF37] text-black text-xs font-bold mb-4">KHÁCH MỜI ĐẶC BIỆT</div>
                 <h3 className="font-serif text-3xl font-bold mb-2">QUỐC NGUYỄN - Chuyên gia AI ứng dụng ngành Dịch Vụ</h3>
                 <p className="text-gray-300 text-lg mb-4">
                 Nhà phát triển hệ thống công cụ AI thiết kế chuyên biệt cho ngành Nails. Anh sẽ trực tiếp hướng dẫn cách giải phóng chủ tiệm khỏi việc phụ thuộc Agency, tối ưu hóa toàn bộ ấn phẩm Marketing hoàn toàn bằng AI.
                 </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Time & Date (Giữ nguyên) */}
      <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">Thời Gian Diễn Ra Sự Kiện</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            <div className="bg-[#111] p-8 rounded-2xl border border-white/10 w-full md:w-auto min-w-[250px]">
              <Calendar className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <p className="text-gray-400 uppercase tracking-widest text-sm">Thứ Tư</p>
              <p className=" text-3xl font-bold text-white mt-2">03/04/2026</p>
            </div>
            
            <div className="hidden md:block h-px w-20 bg-white/10"></div>
            
            <div className="space-y-4 text-left w-full md:w-auto">
              {[
                { time: "8:00 PM", zone: "Central Time (Texas)" },
                { time: "7:00 PM", zone: "New York" },
                { time: "6:00 PM", zone: "California" },
              ].map((slot, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <Clock className="text-[#D4AF37]" size={20} />
                  <div>
                    <span className="block font-bold text-xl text-white">{slot.time}</span>
                    <span className="text-sm text-gray-400">{slot.zone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form (Đã cập nhật logic Submit) */}
      <section id="register-form" className="py-20 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111] rounded-3xl p-8 md:p-12 border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C]"></div>
            
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Đăng Ký Giữ Chỗ Ngay</h2>
              <p className="text-gray-400 mb-8">
                Zoom hoàn toàn <span className="text-[#D4AF37] font-bold">FREE</span>. Chỉ mở <span className="text-[#D4AF37] font-bold"> 50 suất </span>cho người đăng ký sớm nhất.
              </p>

              {/* Phần Đồng Hồ Đếm Ngược */}
              <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6">
                {/* Giờ */}
                <div className="flex flex-col items-center">
                  <div className="bg-[#1a1a1a] border border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] text-[#D4AF37] font-bold text-3xl sm:text-4xl py-3 px-4 rounded-lg w-16 sm:w-20 text-center">
                    {h}
                  </div>
                  <span className="text-gray-400 text-xs sm:text-sm mt-2 font-medium uppercase tracking-wider">Giờ</span>
                </div>

                <div className="text-[#D4AF37] text-3xl sm:text-4xl font-bold pb-6 animate-pulse">:</div>

                {/* Phút */}
                <div className="flex flex-col items-center">
                  <div className="bg-[#1a1a1a] border border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] text-[#D4AF37] font-bold text-3xl sm:text-4xl py-3 px-4 rounded-lg w-16 sm:w-20 text-center">
                    {m}
                  </div>
                  <span className="text-gray-400 text-xs sm:text-sm mt-2 font-medium uppercase tracking-wider">Phút</span>
                </div>

                <div className="text-[#D4AF37] text-3xl sm:text-4xl font-bold pb-6 animate-pulse">:</div>

                {/* Giây */}
                <div className="flex flex-col items-center">
                  <div className="bg-[#1a1a1a] border border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] text-[#D4AF37] font-bold text-3xl sm:text-4xl py-3 px-4 rounded-lg w-16 sm:w-20 text-center">
                    {s}
                  </div>
                  <span className="text-gray-400 text-xs sm:text-sm mt-2 font-medium uppercase tracking-wider">Giây</span>
                </div>
              </div>
            </div>

            {status === 'success' ? (
              <div className="bg-green-500/20 border border-green-500 rounded-xl p-8 text-center text-green-400">
                <CheckCircle size={48} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Đăng Ký Thành Công!</h3>
                <p>Cảm ơn bạn. Thông tin Zoom sẽ được gửi qua Email/Zalo của bạn.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Họ và Tên</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                    placeholder="Nhập tên của bạn"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Số Điện Thoại (Zalo)</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="text-red-500 text-sm text-center">
                    Có lỗi xảy ra khi gửi dữ liệu. Vui lòng thử lại!
                  </div>
                )}

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`w-full bg-gradient-to-r from-[#BF953F] via-[#FBF5B7] to-[#AA771C] text-black font-bold text-xl py-4 rounded-xl transition-all transform hover:scale-[1.02] ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]'}`}
                  >
                    {status === 'submitting' ? 'ĐANG GỬI...' : 'XÁC NHẬN THAM GIA'}
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    *Thông tin của bạn được bảo mật tuyệt đối. Chúng tôi sẽ gửi link Zoom qua Email/Zalo.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-white/10 text-center">
        <p className="text-gray-500 text-sm">
          © 2026 Nail Boss AI. All rights reserved. <br />
          Designed for Success.
        </p>
      </footer>
    </div>
  );
}