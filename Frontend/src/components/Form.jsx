import React from 'react';
import Notification from './Notification';
import DropDown from './DropDown';
import {
  Form as BootstrapForm,
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
const Form = ({
  handleSubmit,
  handleChange,
  fields,
  buttons,
  message,
  className,
  dropdown,
  competitions,
  selectedCompetition,
  setSelectedCompetition,
}) => {
  return (
    <div>
      <BootstrapForm
        className={className}
        onSubmit={handleSubmit}>
        {fields.map((field) => (
          <BootstrapForm.Group
            className="w-100"
            controlId={`form_${field.name}`}
            key={field.name}>
            <BootstrapForm.Label
              className={field.name === 'topics' ? 'mt-4' : ''}>
              {field.label}
            </BootstrapForm.Label>

            {field.type === 'select' ? (
              <BootstrapForm.Control
                as="select"
                name={field.name}
                value={field.value}
                onChange={handleChange}
                disabled={field.disabled || false}
                required={field.required || false}>
                {field.options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled || false}>
                    {option.label}
                  </option>
                ))}
              </BootstrapForm.Control>
            ) : field.type === 'checkbox' ? (
              <Container>
                <Row className="d-flex flex-row align-items-center flex-nowrap">
                  {field.options.map((option) => {
                    return (
                      <Col
                        className="d-flex align-items-center justify-content-center"
                        lg={3}
                        md={3}
                        sm={3}
                        key={option.value}>
                        <div className="d-flex align-items-center">
                          <BootstrapForm.Check.Input
                            type="checkbox"
                            name={field.name}
                            value={option.value}
                            checked={field.value.has(option.value)}
                            onChange={handleChange}
                            className="w-25"
                          />
                          <BootstrapForm.Check.Label className="mb-0">
                            {option.label}
                          </BootstrapForm.Check.Label>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            ) : field.type === 'radio' ? (
              field.options.map((option) => (
                <BootstrapForm.Check
                  type="radio"
                  label={option.label}
                  name={field.name}
                  value={option.value}
                  key={option.value}
                  checked={field.value === option.value}
                  onChange={handleChange}
                />
              ))
            ) : field.type === 'textarea' ? (
              <BootstrapForm.Control
                as="textarea"
                rows={3}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                required={field.required || false}
              />
            ) : (
              // Default to standard input
              <BootstrapForm.Control
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                required={field.required || false}
              />
            )}
          </BootstrapForm.Group>
        ))}
        <Notification
          message={message}
          className="alert alert-danger notification"
        />
        {buttons.map((button) => (
          <button
            key={button.text}
            type="button"
            onClick={button.handle}>
            {button.text}
          </button>
        ))}
      </BootstrapForm>
    </div>
  );
};

export default Form;
