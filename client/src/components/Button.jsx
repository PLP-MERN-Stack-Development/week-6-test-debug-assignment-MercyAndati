// src/components/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  ...props
}) {
  const base = `btn-${variant} btn-${size}`;
  const disabledClass = disabled ? 'btn-disabled' : '';
  const classes = `${base} ${disabledClass} ${className}`.trim();

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
