import ColorOption from "./ColorOption";
import AttributeBox from "./AttributeBox";
import {
  getValidValues,
} from "../../utils/variantUtils";

export default function VariantSelector({
  attributeMap,
  variants,
  selectedAttributes,
  onSelect,
}) {
  return (
    <>
      {Object.entries(attributeMap).map(([attrId, attr]) => {
        const validValues = getValidValues(
          variants,
          selectedAttributes,
          Number(attrId)
        );

        return (
          <div key={attrId}>
            <p className="font-medium mb-2">{attr.name}</p>
            <div className="flex gap-3 flex-wrap">
              {[...attr.values.entries()].map(([valueId, value]) => {
                const selected =
                  selectedAttributes[attrId] === valueId;
                const disabled =
                  validValues.length &&
                  !validValues.includes(valueId);

                if (attr.name.toLowerCase() === "color") {
                  return (
                    <ColorOption
                      key={valueId}
                      color={value}
                      selected={selected}
                      disabled={disabled}
                      onClick={() =>
                        onSelect(Number(attrId), valueId)
                      }
                    />
                  );
                }

                return (
                  <AttributeBox
                    key={valueId}
                    label={value}
                    selected={selected}
                    disabled={disabled}
                    onClick={() =>
                      onSelect(Number(attrId), valueId)
                    }
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
