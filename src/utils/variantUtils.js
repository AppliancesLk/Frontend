export function buildAttributeMap(variants) {
  const map = {};

  variants.forEach((v) => {
    v.attributes.forEach((a) => {
      if (!map[a.attributeId]) {
        map[a.attributeId] = {
          name: a.attributeName,
          values: new Map(),
        };
      }
      map[a.attributeId].values.set(a.valueId, a.value);
    });
  });

  return map;
}

export function getValidValues(variants, selectedAttributes, attributeId) {
  return variants
    .filter((v) =>
      Object.entries(selectedAttributes).every(([attrId, valueId]) =>
        v.attributes.some(
          (a) =>
            a.attributeId === Number(attrId) &&
            a.valueId === Number(valueId)
        )
      )
    )
    .flatMap((v) =>
      v.attributes.filter((a) => a.attributeId === attributeId)
    )
    .map((a) => a.valueId);
}

export function resolveVariant(variants, selectedAttributes) {
  return variants.find((v) =>
    v.attributes.every(
      (a) => selectedAttributes[a.attributeId] === a.valueId
    )
  );
}
