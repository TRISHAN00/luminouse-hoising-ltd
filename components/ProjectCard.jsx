import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function ProjectCard({ project }) {
  const thumb = project?.images?.list?.[0]?.full_path;
  const title = project?.product_data?.title;
  const location = project?.product_data?.location;
  const slug = project?.product_data?.slug;
  return (
    <Link
      href={`/projects/${slug}`}
      aria-label={`View ${project.title} project details`}
    >
      <ProjectItem>
        <ImageContainer>
          <Image
            src={thumb}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 33vw, 25vw"
            priority={project.id <= 2}
          />
          <Overlay />
          <CircleButton aria-label="View project details">
            <span>+</span>
          </CircleButton>
        </ImageContainer>

        <ProjectInfo>
          <h3>{title}</h3>
          <p>{location}</p>
        </ProjectInfo>
      </ProjectItem>
    </Link>
  );
}

const ProjectItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);

    @media (min-width: 768px) {
      transform: translateY(-10px);
    }

    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* Square aspect ratio on mobile */
  overflow: hidden;
  min-height: 550px;

  @media (min-width: 767px) {
    padding-bottom: 120%; /* Taller aspect ratio on tablets */
  }

  @media (min-width: 992px) {
    padding-bottom: 133.33%; /* Original aspect ratio on desktop */
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.3s ease;
  z-index: 1;

  ${ProjectItem}:hover & {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const CircleButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;
  opacity: 0;
  pointer-events: none;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
  }

  span {
    font-size: 20px;
    color: #333;
    line-height: 1;
    transition: all 0.3s ease;

    @media (min-width: 768px) {
      font-size: 24px;
    }
  }

  ${ProjectItem}:hover & {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    pointer-events: auto;
  }

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background-color: #262626;

    span {
      color: white;
    }
  }

  @media (max-width: 767px) {
    /* Always visible on touch devices */
    opacity: 1;
    pointer-events: auto;
  }
`;

const ProjectInfo = styled.div`
  padding: 16px;
  background-color: white;
  border-top: none;

  @media (min-width: 576px) {
    padding: 20px;
  }

  @media (min-width: 992px) {
    padding: 24px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #222;
    margin: 0 0 4px 0;
    transition: color 0.3s ease;

    @media (min-width: 576px) {
      font-size: 18px;
    }

    @media (min-width: 992px) {
      font-size: 20px;
      margin: 0 0 5px 0;
    }
  }

  p {
    font-size: 12px;
    color: #777;
    margin: 0;

    @media (min-width: 576px) {
      font-size: 13px;
    }

    @media (min-width: 992px) {
      font-size: 14px;
    }
  }

  ${ProjectItem}:hover & {
    h3 {
      color: #262626;
    }
  }
`;
