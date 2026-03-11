import { useState } from "react";
import { X, CaretDown, Plus, Trash } from "@phosphor-icons/react";
import { IZeniteNodeDescription, IZeniteProperty } from "../../types/node-types";

const ff = { fontFeatureSettings: "'ss01', 'ss04', 'ss05', 'ss07'" };

interface PropertyPanelProps {
  node: IZeniteNodeDescription | null;
  parameters: Record<string, any>;
  onParameterChange: (name: string, value: any) => void;
  onClose?: () => void;
}

export default function PropertyPanel({ node, parameters, onParameterChange, onClose }: PropertyPanelProps) {
  if (!node) {
    return (
      <div className="h-full flex items-center justify-center bg-[#F6F7F9]">
        <div className="text-center px-[24px]">
          <p className="text-[#98989d] text-[13px]" style={{ letterSpacing: -0.3, ...ff }}>
            Selecione um nó para configurar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-[16px] border-b border-[#EBEBF5]">
        <div className="flex items-center justify-between mb-[8px]">
          <h2 className="text-[#122232] text-[16px] font-bold" style={{ letterSpacing: -0.5, ...ff }}>
            Propriedades
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="w-[28px] h-[28px] rounded-[6px] bg-[#F6F7F9] hover:bg-[#EBEBF5] flex items-center justify-center transition-colors"
            >
              <X size={16} weight="bold" className="text-[#98989d]" />
            </button>
          )}
        </div>
        <p className="text-[#98989d] text-[12px]" style={{ letterSpacing: -0.2, ...ff }}>
          {node.displayName}
        </p>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto p-[16px] space-y-[16px]">
        {node.properties.map((property) => {
          // Verificar displayOptions
          const shouldShow = checkDisplayOptions(property, parameters);
          if (!shouldShow) return null;

          return (
            <PropertyField
              key={property.name}
              property={property}
              value={parameters[property.name] ?? property.default}
              onChange={(value) => onParameterChange(property.name, value)}
              allParameters={parameters}
            />
          );
        })}
      </div>
    </div>
  );
}

interface PropertyFieldProps {
  property: IZeniteProperty;
  value: any;
  onChange: (value: any) => void;
  allParameters: Record<string, any>;
}

function PropertyField({ property, value, onChange, allParameters }: PropertyFieldProps) {
  return (
    <div>
      <label className="block mb-[8px]">
        <span className="text-[#122232] text-[13px] font-semibold" style={{ letterSpacing: -0.3, ...ff }}>
          {property.displayName}
          {property.required && <span className="text-[#FF6B6B] ml-[4px]">*</span>}
        </span>
        {property.description && (
          <span className="block text-[#98989d] text-[11px] mt-[2px]" style={{ letterSpacing: -0.2, ...ff }}>
            {property.description}
          </span>
        )}
      </label>

      {renderField(property, value, onChange)}
    </div>
  );
}

function renderField(property: IZeniteProperty, value: any, onChange: (value: any) => void) {
  switch (property.type) {
    case "string":
      return (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={property.placeholder}
          className="w-full px-[12px] py-[8px] rounded-[8px] border border-[#EBEBF5] bg-white text-[#122232] text-[13px] placeholder:text-[#98989d] focus:outline-none focus:border-[#6868B1] transition-colors"
          style={{ letterSpacing: -0.3, ...ff }}
        />
      );

    case "number":
      return (
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={property.placeholder}
          className="w-full px-[12px] py-[8px] rounded-[8px] border border-[#EBEBF5] bg-white text-[#122232] text-[13px] placeholder:text-[#98989d] focus:outline-none focus:border-[#6868B1] transition-colors"
          style={{ letterSpacing: -0.3, ...ff }}
        />
      );

    case "boolean":
      return (
        <label className="flex items-center gap-[8px] cursor-pointer">
          <input
            type="checkbox"
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            className="w-[18px] h-[18px] rounded-[4px] border-2 border-[#EBEBF5] checked:bg-[#6868B1] checked:border-[#6868B1] cursor-pointer"
          />
          <span className="text-[#122232] text-[13px]" style={{ letterSpacing: -0.3, ...ff }}>
            {property.displayName}
          </span>
        </label>
      );

    case "options":
      return (
        <div className="relative">
          <select
            value={value || property.default}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-[12px] py-[8px] pr-[36px] rounded-[8px] border border-[#EBEBF5] bg-white text-[#122232] text-[13px] appearance-none focus:outline-none focus:border-[#6868B1] transition-colors cursor-pointer"
            style={{ letterSpacing: -0.3, ...ff }}
          >
            {property.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <CaretDown size={16} weight="bold" className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#98989d] pointer-events-none" />
        </div>
      );

    case "json":
      return (
        <textarea
          value={typeof value === "string" ? value : JSON.stringify(value, null, 2)}
          onChange={(e) => {
            try {
              onChange(JSON.parse(e.target.value));
            } catch {
              onChange(e.target.value);
            }
          }}
          placeholder={property.placeholder || "{}"}
          rows={property.typeOptions?.rows || 5}
          className="w-full px-[12px] py-[8px] rounded-[8px] border border-[#EBEBF5] bg-white text-[#122232] text-[12px] font-mono placeholder:text-[#98989d] focus:outline-none focus:border-[#6868B1] transition-colors resize-none"
        />
      );

    case "filter":
      return (
        <div className="p-[12px] rounded-[8px] border border-[#EBEBF5] bg-[#F6F7F9]">
          <p className="text-[#98989d] text-[11px]" style={{ letterSpacing: -0.2, ...ff }}>
            Construtor de condições visual (em desenvolvimento)
          </p>
          <textarea
            value={typeof value === "string" ? value : JSON.stringify(value, null, 2)}
            onChange={(e) => {
              try {
                onChange(JSON.parse(e.target.value));
              } catch {
                onChange(e.target.value);
              }
            }}
            placeholder='{"field": "valor", "operator": "equals", "value": "exemplo"}'
            rows={3}
            className="w-full mt-[8px] px-[12px] py-[8px] rounded-[8px] border border-[#EBEBF5] bg-white text-[#122232] text-[11px] font-mono placeholder:text-[#98989d] focus:outline-none focus:border-[#6868B1] transition-colors resize-none"
          />
        </div>
      );

    case "color":
      return (
        <div className="flex gap-[8px]">
          <input
            type="color"
            value={value || "#6868B1"}
            onChange={(e) => onChange(e.target.value)}
            className="w-[48px] h-[36px] rounded-[8px] border border-[#EBEBF5] cursor-pointer"
          />
          <input
            type="text"
            value={value || "#6868B1"}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#6868B1"
            className="flex-1 px-[12px] py-[8px] rounded-[8px] border border-[#EBEBF5] bg-white text-[#122232] text-[13px] font-mono placeholder:text-[#98989d] focus:outline-none focus:border-[#6868B1] transition-colors"
          />
        </div>
      );

    case "dateTime":
      return (
        <input
          type="datetime-local"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-[12px] py-[8px] rounded-[8px] border border-[#EBEBF5] bg-white text-[#122232] text-[13px] focus:outline-none focus:border-[#6868B1] transition-colors"
          style={{ letterSpacing: -0.3, ...ff }}
        />
      );

    case "multiOptions":
      return (
        <div className="space-y-[6px]">
          {property.options?.map((option) => (
            <label key={option.value} className="flex items-center gap-[8px] cursor-pointer">
              <input
                type="checkbox"
                checked={(value || []).includes(option.value)}
                onChange={(e) => {
                  const current = value || [];
                  if (e.target.checked) {
                    onChange([...current, option.value]);
                  } else {
                    onChange(current.filter((v: any) => v !== option.value));
                  }
                }}
                className="w-[18px] h-[18px] rounded-[4px] border-2 border-[#EBEBF5] checked:bg-[#6868B1] checked:border-[#6868B1] cursor-pointer"
              />
              <span className="text-[#122232] text-[13px]" style={{ letterSpacing: -0.3, ...ff }}>
                {option.name}
              </span>
            </label>
          ))}
        </div>
      );

    default:
      return (
        <div className="p-[12px] rounded-[8px] border border-[#EBEBF5] bg-[#F6F7F9]">
          <p className="text-[#98989d] text-[11px]" style={{ letterSpacing: -0.2, ...ff }}>
            Tipo de campo "{property.type}" em desenvolvimento
          </p>
        </div>
      );
  }
}

// Verificar se deve mostrar o campo baseado em displayOptions
function checkDisplayOptions(property: IZeniteProperty, parameters: Record<string, any>): boolean {
  if (!property.displayOptions) return true;

  const { show, hide } = property.displayOptions;

  // Verificar show
  if (show) {
    for (const [key, values] of Object.entries(show)) {
      const currentValue = parameters[key];
      if (!values.includes(currentValue)) {
        return false;
      }
    }
  }

  // Verificar hide
  if (hide) {
    for (const [key, values] of Object.entries(hide)) {
      const currentValue = parameters[key];
      if (values.includes(currentValue)) {
        return false;
      }
    }
  }

  return true;
}
