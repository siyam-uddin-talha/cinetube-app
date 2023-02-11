import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

type AppProps = {
  maxCount: number;
  onChange: Function;
};
let next: number = 0;
let prev: number = 0;

const UsePaginator: React.FC<AppProps> = ({ maxCount, onChange }) => {
  const [pageCount, setPageCount] = useState<number[]>([]);

  const [selectPage, setSelectPage] = useState<number>(1);

  useEffect(() => {
    const container: number[] = [];
    for (let i = 0; i < maxCount; i++) {
      if (container.length !== 3) {
        container.push(i + 1);
      }
    }
    if (maxCount > 3) {
      setPageCount(container.slice(0, 3));
    }
    setPageCount(container);
  }, [maxCount]);

  const handleSelect = (count: number) => {
    setSelectPage(count);
    onChange(count);

    if (count < maxCount) {
      next = count + 1;
    }
    if (count > 0) {
      prev = count - 1;
    }
    if (count === maxCount) {
      const container: number[] = [];
      if ([1, 2].includes(maxCount)) {
        for (let i = 0; i < maxCount; i++) {
          if (container.length !== 3) {
            container.push(i + 1);
          }
        }
        setPageCount(container);

        return;
      }
      setPageCount([count - 2, count - 1, count]);
      return;
    }
    if (next !== 0 && prev !== 0) {
      setPageCount([prev, count, next]);
      return;
    }
    // setPageCount([count]);
  };
  if (maxCount === 0) {
    return <View></View>;
  }
  return (
    <View style={[style.container]}>
      <View style={[style.jcsb, style.fdr, style.fg, style.aic]}>
        <View>
          {selectPage !== 1 && (
            <AntDesign
              name="arrowleft"
              size={20}
              color="white"
              onPress={() => handleSelect(selectPage - 1)}
            />
          )}
        </View>

        <View style={[style.fdr]}>
          {pageCount.map((e, i) => (
            <Text
              key={i}
              // mode={e === selectPage ? "outlined" : "contained"}
              // color="white"
              onPress={() => handleSelect(e)}
              style={e === selectPage ? style.select : style.default}
            >
              {e}
            </Text>
          ))}

          {![...pageCount, 1, 2].includes(maxCount) && (
            <View style={[style.fdr, style.aic]}>
              <Text style={[common.dot]}>...</Text>
              <Text
                style={[common.common, common.maxBtn]}
                onPress={() => handleSelect(maxCount)}
              >
                {maxCount}
              </Text>
            </View>
          )}
        </View>
        <View>
          {selectPage !== maxCount && (
            <AntDesign
              name="arrowright"
              size={20}
              color="white"
              onPress={() => handleSelect(selectPage + 1)}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default UsePaginator;

const colorPrimary: string = "#1890ff";
const transparent: string = "#ffffff00";
const deepBlue = "#110d28";
const deepBlue1 = "#1b143d";
const gray1: string = "#5e5e5e";
const gray2: string = "#F7F858";

const common = StyleSheet.create({
  common: {
    color: "white",
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 15,
    marginLeft: 15,
    textAlign: "center",
  },
  maxBtn: {
    backgroundColor: gray1,
  },
  dot: {
    marginLeft: 10,
    color: "white",
    fontSize: 15,
  },
});

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  _f: {
    flex: 1,
  },
  fg: {
    flexGrow: 1,
  },
  select: {
    ...common.common,
    borderColor: colorPrimary,
    borderWidth: 2,
    color: "white",
  },
  default: {
    backgroundColor: "white",
    ...common.common,
    borderColor: "transparent",
    color: "black",
  },
  fdr: {
    flexDirection: "row",
  },
  jcsb: {
    justifyContent: "space-between",
  },
  jcc: {
    justifyContent: "center",
  },
  aic: {
    alignItems: "center",
  },
  aie: {
    alignItems: "flex-end",
  },
});
