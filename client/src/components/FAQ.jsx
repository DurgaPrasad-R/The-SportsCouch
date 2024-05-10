import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
const FAQ = ({ question, answer, isVisible, setIsVisible }) => {
  return (
    <div className="faq shadow-lg justify-center p-4 mx-10 bg-slate-100 rounded-md my-2">
      <div>
        <div className="question flex items-center justify-between">
          <h3>{question}</h3>
          {isVisible ? (
            <FaMinus
              className="mt-1 cursor-pointer"
              onClick={() => setIsVisible(false)}
            />
          ) : (
            <FaPlus
              className="mt-1 cursor-pointer"
              onClick={() => setIsVisible(true)}
            />
          )}
        </div>
        {isVisible && <p className="px-4 py-2">{answer}</p>}
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [visibleSection, setVisibleSection] = useState("");
  return (
    <div className="faq-section flex flex-col justify-center my-4">
      <h1 className="title font-bold text-2xl flex justify-center p-4">
        Frequently Asked Questions
      </h1>
      <FAQ
        question="What is the purpose of this app?"
        answer="This app is designed to help you find the local matches being played and let you join teams or create a team."
        isVisible={visibleSection === "q1"}
        setIsVisible={() =>
          setVisibleSection(visibleSection === "q1" ? "" : "q1")
        }
      />
      <FAQ
        question="How do I use this app?"
        answer="You can create a team or join an existing team going for a match."
        isVisible={visibleSection === "q2"}
        setIsVisible={() =>
          setVisibleSection(visibleSection === "q2" ? "" : "q2")
        }
      />
      <FAQ
        question="How do I know if the match is still active?"
        answer="If you've joined a session i.e a team going for a match you can see the status."
        isVisible={visibleSection === "q3"}
        setIsVisible={() =>
          setVisibleSection(visibleSection === "q3" ? "" : "q3")
        }
      />
      <FAQ
        question="What is the purpose of this app?"
        answer="This app is designed to help you find the local matches being played and let you join teams or create a team."
        isVisible={visibleSection === "q1"}
        setIsVisible={() =>
          setVisibleSection(visibleSection === "q1" ? "" : "q1")
        }
      />
      <FAQ
        question="What is the purpose of this app?"
        answer="This app is designed to help you find the local matches being played and let you join teams or create a team."
        isVisible={visibleSection === "q1"}
        setIsVisible={() =>
          setVisibleSection(visibleSection === "q1" ? "" : "q1")
        }
      />
    </div>
  );
};

export default FAQSection;
