"use client";
import React from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { motion,useScroll} from "framer-motion";
const About = () => {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
      style={{ scaleX: scrollYProgress }}
      className=" h-1 w-full fixed top-0 pb-6 ">

      </motion.div>
      <div className="w-full">
        <div className="px-5 pt-20 md:px-36 lg:px-36">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}

          >
            <h1 className="text-4xl font-bold  font-serif">About me.</h1>
          </motion.div>
          <div className=" ">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}

              className=" mt-12"
            >
              <div className="flex items-center">
                <CircleOutlinedIcon className="absolute -mx-4 text-sm" />

                <h1 className="font-bold ">Web Development</h1>
              </div>
              <div>
      
                <p className="trackin-wider font-mono pt-4">
                  The power of first impressions cannot be underestimated, and
                  the gateway to capitalizing on them lies in exceptional
                  website design. An outstanding website transcends mere
                  aesthetics and extends its influence to encompass seamless
                  functionality and user-friendly navigation. Drawing upon my
                  expertise as a seasoned programmer, I possess the unique
                  ability to tackle intricate technical challenges while
                  crafting websites that exude sleekness and visual allure.
                  Moreover, my extensive knowledge of recognized technical
                  standards is complemented by my proficiency in modern building
                  practices, ensuring that every aspect of your website is
                  finely tuned to perfection.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className=" mt-12"
            >
              <div className="flex items-center">
                <CircleOutlinedIcon className="absolute -mx-4 text-sm" />

                <h1 className="font-bold ">MCA</h1>
              </div>
              <div>
               
                <p className="trackin-wider font-mono pt-4">
                Pursuing an MCA and aspiring for a web development role, I am honing my skills to excel in the dynamic field. I am constructing a robust portfolio, mastering HTML, CSS, JavaScript, and frameworks like React JS And Next JS. Actively networking at events, I am also considering internships to gain hands-on experience. Online platforms and open-source contributions showcase my dedication, while continuous learning strengthens my technical prowess. I am cultivating not only coding skills but also effective communication and problem-solving abilities. With an eye on the future, I am poised to contribute and thrive in the world of web development.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className=" mt-12"
            >
              <div className="flex items-center">
                <CircleOutlinedIcon className="absolute -mx-4 text-sm" />

                <h1 className="font-bold  uppercase">intermediate</h1>
              </div>
              <div>
               
                <p className="trackin-wider font-mono pt-4">
                 
I completed my intermediate education at St. Joseph Inter College Torpa, where I pursued a science stream. This academic journey has equipped me with a solid foundation in various scientific disciplines. Through rigorous study of subjects like Physics, Chemistry, and Mathematics, I have developed a deep understanding of fundamental concepts and honed my problem-solving abilities. This education has not only broadened my knowledge but also instilled in me a curiosity to explore the intricate workings of the natural world. As I transition into web development, I am bringing this analytical approach and systematic thinking to create efficient and innovative solutions in the digital realm.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className=" mt-12"
            >
              <div className="flex items-center">
                <CircleOutlinedIcon className="absolute -mx-4 text-sm" />

                <h1 className="font-bold  uppercase">matriculation</h1>
              </div>
              <div>
              
                <p className="trackin-wider font-mono pt-4 inline-block mb-6">
                successfully completed my matriculation education at S.S. High School Tapkara, a pivotal phase in my academic journey. During my time at this institution, I gained a strong academic foundation that has shaped my approach to learning and problem-solving. The dedicated educators and comprehensive curriculum provided me with a well-rounded education, helping me develop essential skills in subjects ranging from mathematics and language to social sciences.
                </p>
              </div>
            </motion.div>
          </div>
          {/* <div className="underline underline-offset-2 pt-4 pb-4">
            <Link href="/projects">Let's move Projects section </Link>
            <ArrowForwardIcon className="font-bold font-mono" />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default About;
