import React, { useRef, useState, useEffect } from "react";
import ProjectItem from "./ProjectItem";
import projects from "../data/projects";
import personalProjects from "../data/personalProjects";
import { useBackgroundPaths } from "./BackgroundPaths";
import FadeInWhenVisible from "./animations/FadeInWhenVisible";
import "../styles/Projects.css";

function Projects() {
  const allProjects = [...projects, ...personalProjects];
  const itemRefs = useRef([]);
  const sectionRef = useRef();
  const svgRef = useRef();
  const svgRef2 = useRef();
  const headingRef = useRef();

  const headingHeight = headingRef.current?.offsetHeight || 60;
  const verticalStartOffset = headingHeight + 54.5;
  const verticalStartOffset2 = headingHeight + 121;

  const [dimensions, setDimensions] = useState({ width: window.innerWidth });

  useEffect(() => {
    const onResize = () => setDimensions({ width: window.innerWidth });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useBackgroundPaths({
    svgRef,
    svgRef2,
    sectionRef,
    itemRefs,
    projects: allProjects,
    verticalStartOffset,
    verticalStartOffset2,
  });

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-heading-wrapper">
        <div className="projects-heading" ref={headingRef}>
          <h1>PROFESSIONAL PROJECTS</h1>
        </div>
      </div>

      <svg
        ref={svgRef}
        className="line-background"
        preserveAspectRatio="none"
      />
      <svg
        ref={svgRef2}
        className="line-background-accent"
        preserveAspectRatio="none"
      />

      {projects.map((item, idx) => (
        <div
          key={`main-${idx}`}
          className="project-wrapper"
          ref={(el) => (itemRefs.current[idx] = el)}
        >
          <FadeInWhenVisible>
            <ProjectItem
              company={item.company}
              website={item.website || ""}
              logo={item.logo || ""}
              projects={item.projects}
              index={idx}
            />
          </FadeInWhenVisible>
        </div>
      ))}

      <div className="projects-heading-wrapper">
        <div className="projects-heading margin-top">
          <h1>PERSONAL PROJECTS</h1>
        </div>
      </div>

      {personalProjects.map((item, pIdx) => {
        const globalIndex = projects.length + pIdx;
        return (
          <div
            key={`personal-${pIdx}`}
            className="project-wrapper"
            ref={(el) => (itemRefs.current[globalIndex] = el)}
          >
            <FadeInWhenVisible>
              <ProjectItem
                company={item.company}
                website={item.website || ""}
                logo={item.logo || ""}
                projects={item.projects}
                index={globalIndex}
              />
            </FadeInWhenVisible>
          </div>
        );
      })}
    </section>
  );
}

export default Projects;
