import React from 'react';
import classNames from 'classnames';

const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}) => {
  const styles = {
    "--size": size,
    "--duration": duration,
    "--anchor": anchor,
    "--border-width": borderWidth,
    "--color-from": colorFrom,
    "--color-to": colorTo,
    "--delay": `-${delay}s`,
  };

  return (
    <div
      style={styles}
      className={classNames(
        "pointer-events-none absolute inset-0 rounded-[inherit] border-[calc(var(--border-width)*1px)] border-transparent",
        "mask-clip-[padding-box,border-box] mask-composite-intersect",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)]",
        "after:animate-border-beam after:bg-gradient-to-l from-[var(--color-from)] to-[var(--color-to)]",
        "after:delay-[var(--delay)] after:animate-[border-animation_var(--duration)_infinite]",
        className
      )}
    />
  );
};

export default BorderBeam;
