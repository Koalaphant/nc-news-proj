import { useEffect, useState } from "react";
import { fetchTopics } from "../api";
import "./topics.css";
import { Link } from "react-router-dom";

const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <>
      <section>
        <ul className="topic-section">
          {topics.map((topic) => {
            return (
              <li key={topic.slug} className="topic-card">
                <Link
                  className="topic-title"
                  to={{
                    pathname: `/topics/${topic.slug}`,
                    state: topic,
                  }}
                >
                  <h3>{topic.slug}</h3>
                  <p>{topic.description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Topics;
