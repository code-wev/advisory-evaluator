export default function MissionSection() {
  return (
    <section className="w-full bg-white py-20 flex justify-center">
      <div className="max-w-[850px] w-full px-6">

        {/* Mission Title */}
        <h2 className="text-[17px] font-semibold text-[#1A1A1A] mb-4">
          Our Mission: Demystifying Financial Advisory Choices
        </h2>

        {/* Mission Paragraphs */}
        <p className="text-[13.5px] leading-[22px] text-[#4A4A4A] mb-5">
          In today’s complex financial landscape, finding the right advisory firm can feel overwhelming.
          The differences between practices—in their services, fees, and investment philosophies—are 
          critical to your success, yet this information is often buried in complex language or regulatory filings.
        </p>

        <p className="text-[13.5px] leading-[22px] text-[#4A4A4A] mb-5">
          Advisory Evaluator was founded on a simple belief: every investor deserves transparent, 
          understandable, and unbiased information.
        </p>

        <p className="text-[13.5px] leading-[22px] text-[#4A4A4A] mb-10">
          We bridge the gap between complex regulatory data and your need for clear, actionable insights. 
          Our platform transforms official SEC filings into straightforward reports, highlighting the key 
          factors that truly differentiate one advisory practice from another.
        </p>

        {/* How We Help Title */}
        <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-4">
          How We Help You Make Confident Choices
        </h3>

        {/* How We Help List */}
        <ul className="text-[13.5px] leading-[22px] text-[#4A4A4A] mb-10 space-y-4 list-disc pl-5">
          <li>
            <span className="font-semibold text-[#1A1A1A]">Clarity from Complexity:</span> 
            &nbsp;We translate dense Form ADV documents into easy-to-understand reports, so you can quickly 
            grasp a firm&apos;s services, fee structure, and operational history.
          </li>

          <li>
            <span className="font-semibold text-[#1A1A1A]">Unbiased, Data-Driven Insights:</span> 
            &nbsp;Our platform is built on objective data directly from the SEC. We do not accept payments 
            for listings or rankings, ensuring the information you see is impartial and reliable.
          </li>

          <li>
            <span className="font-semibold text-[#1A1A1A]">Focus on What Matters:</span> 
            &nbsp;We highlight crucial details like disciplinary disclosures, compensation models, and 
            areas of specialization, helping you evaluate a firm’s approach against your unique needs and goals.
          </li>
        </ul>

        {/* Commitment Section */}
        <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-4">
          Our Commitment to Transparency
        </h3>

        <p className="text-[13.5px] leading-[22px] text-[#4A4A4A]">
          Whether you’re exploring financial advisory services for the first time or re-evaluating your 
          current options, our goal is to be your trusted resource. We are committed to providing the 
          clarity and insights necessary to guide your journey toward a more secure financial future.
        </p>

      </div>
    </section>
  );
}
