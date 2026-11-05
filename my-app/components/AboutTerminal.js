"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { education, experience, hardSkills, profile, softSkills } from "@/data/profile";

const TYPE_MS = 34;
const CHIPS = ["aboutme", "now", "softskill", "hardskill", "contact"];

function answer(command) {
  switch (command) {
    case "help":
      return `Commands: ${CHIPS.join(", ")}, clear`;
    case "aboutme":
      return `${profile.name}, ${profile.title.toLowerCase()} and ${education[0].role.replace("Bachelor of ", "")} student at ${education[0].org}.`;
    case "now":
      return `${experience[0].role} at ${experience[0].org}.`;
    case "softskill":
      return softSkills.join(", ");
    case "hardskill":
      return (
        <dl className="term__list">
          {hardSkills.map((group) => (
            <div key={group.label}>
              <dt>{group.label}</dt>
              <dd>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      );
    case "contact":
      return <a className="term__link" href={`mailto:${profile.email}`}>{profile.email}</a>;
    case "sudo":
      return "Nice try.";
    default:
      return `command not found: ${command}. Try help.`;
  }
}

export default function AboutTerminal() {
  const [log, setLog] = useState([]);
  const [value, setValue] = useState("");
  const root = useRef(null);
  const timer = useRef(0);
  const nextId = useRef(0);

  const submit = useCallback((raw) => {
    const command = raw.trim().toLowerCase();
    setValue("");
    if (!command) return;
    if (command === "clear") {
      setLog([]);
      return;
    }
    nextId.current += 1;
    const id = nextId.current;
    setLog((entries) => [...entries.slice(-2), { id, command, output: answer(command) }]);
  }, []);

  // Mengetik perintah huruf demi huruf, seperti orang di depan terminal.
  const type = useCallback(
    (command, after) => {
      clearTimeout(timer.current);
      let length = 0;
      const step = () => {
        length += 1;
        setValue(command.slice(0, length));
        timer.current = setTimeout(() => {
          if (length < command.length) {
            step();
            return;
          }
          submit(command);
          if (after) timer.current = setTimeout(after, 650);
        }, TYPE_MS);
      };
      step();
    },
    [submit],
  );

  useEffect(() => {
    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        watcher.disconnect();
        type("aboutme", () => type("now"));
      },
      { threshold: 0.5 },
    );
    watcher.observe(root.current);
    return () => {
      watcher.disconnect();
      clearTimeout(timer.current);
    };
  }, [type]);

  return (
    <div className="term" ref={root} data-reveal>
      <div className="term__bar">
        <span>nelloaurelius@porto</span>
        <span>~/about</span>
      </div>
      <div className="term__log" aria-live="polite">
        {log.map((entry) => (
          <div className="term__entry" key={entry.id}>
            <p><span className="term__prompt">$</span> {entry.command}</p>
            <div className="term__output">{entry.output}</div>
          </div>
        ))}
      </div>
      <form
        className="term__line"
        onSubmit={(event) => {
          event.preventDefault();
          clearTimeout(timer.current);
          submit(value);
        }}
      >
        <span className="term__prompt" aria-hidden="true">$</span>
        <input
          className="term__input"
          value={value}
          onChange={(event) => {
            clearTimeout(timer.current);
            setValue(event.target.value);
          }}
          aria-label="Type a command"
          placeholder="type help"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </form>
      <div className="term__chips">
        {CHIPS.map((chip) => (
          <button key={chip} type="button" onClick={() => type(chip)}>{chip}</button>
        ))}
      </div>
    </div>
  );
}
