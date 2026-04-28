// Notification service for customer reviews

export const sendReviewWhatsAppNotification = async (review) => {
  const stars = '⭐'.repeat(review.rating) + '☆'.repeat(5 - review.rating)
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
  
  const message = `╔══════════════════════════════════╗
║ � *UTAMU WA MIWA - NEW REVIEW* � ║
╚══════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
� *CUSTOMER FEEDBACK REPORT*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏆 *RATING PERFORMANCE*
${stars} (${review.rating}/5.0)

📋 *REVIEW SUMMARY*
┌─ 📝 *Title:* ${review.title}
└─ 💬 *Feedback:* ${review.content}

� *REVIEW DATE*
${currentDate}

${review.productName ? `🍹 *PRODUCT REVIEWED*
${review.productName}` : ''}

🎯 *SENTIMENT INDICATOR*
${review.rating >= 4 ? '😊 POSITIVE • Excellent Experience!' : 
  review.rating >= 3 ? '😐 NEUTRAL • Room for Improvement' : 
  '😞 CONCERN • Immediate Attention Needed'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 *BUSINESS INTELLIGENCE*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 *Action Required:* 
${review.rating >= 4 ? '✅ Thank customer & share on social media' : 
  review.rating >= 3 ? '📧 Follow up for improvement suggestions' : 
  '� Contact customer immediately to resolve issues'}

📈 *Review Impact:* 
${review.rating >= 4 ? '📊 Boosts brand reputation & sales' : 
  review.rating >= 3 ? '📉 Neutral impact on customer perception' : 
  '⚠️ May affect customer acquisition & retention'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌟 *UTAMU WA MIWA*
📍 Stone Town, Zanzibar
📞 +255 718 622 621
🌐 Fresh Sugarcane Juice Since 2024
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*Powered by Utamu wa Miwa Review System*
*Customer Excellence • Quality Assurance*`

  const whatsappUrl = `https://wa.me/255718622621?text=${encodeURIComponent(message)}`
  
  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank')
}

export const sendReviewEmailNotification = async (review) => {
  const subject = `New Customer Review - ${review.productName} - ${review.rating}/5 stars`
  
  const body = `New Customer Review Received

Rating: ${review.rating}/5 stars
Title: ${review.title}
Review: ${review.content}
Customer: ${review.name}
Email: ${review.email}
Product: ${review.productName}
Date: ${new Date().toLocaleDateString()}

${review.images.length > 0 ? 'Customer attached photos' : ''}

---
Utamu wa Miwa - Customer Review System`

  const mailtoUrl = `mailto:utamuwamiwa@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  
  // Open email client
  window.open(mailtoUrl, '_blank')
}

export const sendReviewNotifications = async (review) => {
  try {
    // Send WhatsApp notification (primary)
    await sendReviewWhatsAppNotification(review)
    
    // Optional: Also send email as backup
    // await sendReviewEmailNotification(review)
    
    console.log('Review notifications sent successfully')
  } catch (error) {
    console.error('Error sending review notifications:', error)
  }
}

export default {
  sendReviewWhatsAppNotification,
  sendReviewEmailNotification,
  sendReviewNotifications
}
