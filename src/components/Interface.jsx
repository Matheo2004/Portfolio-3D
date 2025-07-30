import { ValidationError, useForm } from "@formspree/react";
import { motion, useInView } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import { useRef, useEffect, useState } from "react";

const Section = (props) => {
    const { children, mobileTop } = props;

    return (
        <motion.section
            className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start
  ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
  `}
            initial={{
                opacity: 0,
                y: 50,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 1,
                    delay: 0.6,
                },
            }}
        >
            {children}
        </motion.section>
    );
};

export const Interface = (props) => {
    const { setSection } = props;
    return (
        <div className="flex flex-col items-center w-screen">
            <div className="mr-60">
                <AboutSection setSection={setSection} />
            </div>
            <SkillsSection />
            <ProjectsSection />
            <MoreSection />
            <ContactSection />
        </div>
    );
};

const AboutSection = (props) => {
    const { setSection } = props;
    return (
        <Section mobileTop>
            <div className="flex">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-snug mt-8 md:mt-0 mr-15">
                    Hi, I'm
                    <br />
                    <p className="bg-white px-1 italic mt-3">Matheo Bertin</p>
                </h1>
            </div>
            <motion.p
                className="text-lg text-gray-600 mt-4"
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1,
                    delay: 1.5,
                }}
            >
                I'm currently a data engineering apprentice in the French Navy <br /> and a student at ISEN
            </motion.p>
            <motion.button
                onClick={() => setSection(3)}
                className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-4 md:mt-16`}
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1,
                    delay: 2,
                }}
            >
                More
            </motion.button>
            <motion.button
                onClick={() => setSection(4)}
                className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-4 md:mt-16`}
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 1,
                    delay: 2,
                }}
            >
                Contact me
            </motion.button>
        </Section>
    );
};

const skills = [
    {
        title: "React / React Native",
        level: 70,
    },
    {
        title: "Nodejs",
        level: 70,
    },
    {
        title: "Javascript",
        level: 60,
    },
    {
        title: "Python",
        level: 60,
    },
    {
        title: "DB (MongoDB, MySQL, Neo4j)",
        level: 60,
    },
];
const languages = [
    {
        title: "🇫🇷 French",
        level: 100,
    },
    {
        title: "🇺🇸 English",
        level: 60,
    },
];

const SkillsSection = () => {
    return (
        <Section>
            <motion.div className="w-full" whileInView={"visible"}>
                <h2 className="text-3xl md:text-5xl font-bold text-white">Skills</h2>
                <div className="mt-8 space-y-4">
                    {skills.map((skill, index) => (
                        <div className="w-full md:w-64" key={index}>
                            <motion.h3
                                className="text-lg md:text-xl font-bold text-gray-100"
                                initial={{
                                    opacity: 0,
                                }}
                                variants={{
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            duration: 1,
                                            delay: 1 + index * 0.2,
                                        },
                                    },
                                }}
                            >
                                {skill.title}
                            </motion.h3>
                            <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                <motion.div
                                    className="h-full bg-indigo-500 rounded-full "
                                    style={{ width: `${skill.level}%` }}
                                    initial={{
                                        scaleX: 0,
                                        originX: 0,
                                    }}
                                    variants={{
                                        visible: {
                                            scaleX: 1,
                                            transition: {
                                                duration: 1,
                                                delay: 1 + index * 0.2,
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold mt-10 text-white">
                        Languages
                    </h2>
                    <div className="mt-8 space-y-4">
                        {languages.map((lng, index) => (
                            <div className="w-full md:w-64" key={index}>
                                <motion.h3
                                    className="text-lg md:text-xl font-bold text-gray-100"
                                    initial={{
                                        opacity: 0,
                                    }}
                                    variants={{
                                        visible: {
                                            opacity: 1,
                                            transition: {
                                                duration: 1,
                                                delay: 2 + index * 0.2,
                                            },
                                        },
                                    }}
                                >
                                    {lng.title}
                                </motion.h3>
                                <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                                    <motion.div
                                        className="h-full bg-indigo-500 rounded-full "
                                        style={{ width: `${lng.level}%` }}
                                        initial={{
                                            scaleX: 0,
                                            originX: 0,
                                        }}
                                        variants={{
                                            visible: {
                                                scaleX: 1,
                                                transition: {
                                                    duration: 1,
                                                    delay: 2 + index * 0.2,
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Section>
    );
};

const ProjectsSection = () => {
    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

    const nextProject = () => {
        setCurrentProject((currentProject + 1) % projects.length);
    };

    const previousProject = () => {
        setCurrentProject((currentProject - 1 + projects.length) % projects.length);
    };

    return (
        <Section>
            <div className="flex w-full h-full gap-8 items-center justify-center">
                <button
                    className="hover:text-indigo-600 transition-colors"
                    onClick={previousProject}
                >
                    ← Previous
                </button>
                <h2 className="text-3xl md:text-5xl font-bold">Projects</h2>
                <button
                    className="hover:text-indigo-600 transition-colors"
                    onClick={nextProject}
                >
                    Next →
                </button>
            </div>
        </Section>
    );
};

const ContactSection = () => {
    const [state, handleSubmit] = useForm("xnnzzaky");
    return (
        <Section>
            <h2 className="text-3xl md:text-5xl font-bold">Contact me</h2>
            <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
                {state.succeeded ? (
                    <p className="text-gray-900 text-center">Thanks for your message !</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label for="name" className="font-medium text-gray-900 block mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
                        />
                        <label
                            for="email"
                            className="font-medium text-gray-900 block mb-1 mt-8"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
                        />
                        <ValidationError
                            className="mt-1 text-red-500"
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                        />
                        <label
                            for="email"
                            className="font-medium text-gray-900 block mb-1 mt-8"
                        >
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            className="h-32 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
                        />
                        <ValidationError
                            className="mt-1 text-red-500"
                            errors={state.errors}
                        />
                        <button
                            disabled={state.submitting}
                            className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16 "
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </Section>
    );
};

// Données des sections
const timelineItems = [
    {
        title: "About Me",
        text: "To be simple, I'm a 20 years old French student, who loves to code and learn new things. I'm currently studying computer science and working on various personal projects. I have a passion for web development and enjoy working with the latest technologies. In my free time, I like to look at open-source projects and explore new programming languages. I'm always looking for new challenges and opportunities to grow as a developer.",
    },
    {
        title: "Activities",
        text: "To be simple, I'm a 20 years old French student, who loves to code and learn new things. I'm currently studying computer science and working on various personal projects. I have a passion for web development and enjoy working with the latest technologies. In my free time, I like to look at open-source projects and explore new programming languages. I'm always looking for new challenges and opportunities to grow as a developer.",
    },
    {
        title: "Career",
        text: "To be simple, I'm a 20 years old French student, who loves to code and learn new things. I'm currently studying computer science and working on various personal projects. I have a passion for web development and enjoy working with the latest technologies. In my free time, I like to look at open-source projects and explore new programming languages. I'm always looking for new challenges and opportunities to grow as a developer.",
    },
];

// Composant pour chaque section
const TimelineItem = ({ title, text, index, onInView }) => {
    const ref = useRef();
    const isInView = useInView(ref, { once: false, margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            onInView(index);
        }
    }, [isInView, index, onInView]);

    return (
        <section
            ref={ref}
            className="h-screen flex flex-col items-center p-10 snap-start"
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="max-w-xl text-center mt-32"
            >
                <h2 className="text-4xl font-bold mb-4">{title}</h2>
                <p className="text-lg text-gray-700">{text}</p>
            </motion.div>
        </section>
    );
};

// Composant principal avec la barre latérale
const MoreSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleInView = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="relative flex">
            {/* Barre verticale à gauche */}
            <div className="fixed left-64 mt-96 z-10 flex flex-col gap-4">
                {timelineItems.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-4 h-4 rounded-full border-2 transition-all ${activeIndex === idx
                                ? "bg-blue-600 border-blue-600 scale-110"
                                : "bg-gray-300 border-gray-400"
                            }`}
                    />
                ))}
            </div>

            {/* Contenu scrollable */}
            <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory">
                {timelineItems.map((item, idx) => (
                    <TimelineItem
                        key={idx}
                        index={idx}
                        title={item.title}
                        text={item.text}
                        onInView={handleInView}
                    />
                ))}
            </div>
        </div>
    );
};